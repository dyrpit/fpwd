import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, of } from 'rxjs';

import { CacheService } from 'src/cache/cache.service';

import { DEFAULT_EXCHANG_RATE } from 'src/constants/const';

import {
  BaseCurrency,
  ExchangeApiResponse,
  ExchangeCurrency,
} from 'src/types/types';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  constructor(
    private readonly cacheService: CacheService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async exchangeCurrency(
    base: BaseCurrency,
    exchange: ExchangeCurrency,
    exchangeValue: number,
  ) {
    const { rate } = await this.getExchangeRates(base, exchange);

    const resultCurrencyAmount = exchangeValue * rate;

    const transaction = {
      baseAmount: exchangeValue,
      exchangedAmount: resultCurrencyAmount,
      rate,
      timestamp: new Date(),
    };

    if (await this.cacheService.saveTransaction(transaction)) {
      return transaction;
    }

    throw new BadRequestException();
  }

  async getTransactions() {
    const transaction = await this.cacheService.getTransactions();

    if (transaction) {
      return transaction;
    }

    throw new NotFoundException();
  }

  async getExchangeRates(base: BaseCurrency, exchange: ExchangeCurrency) {
    const exchangeRatesCache = await this.cacheService.getExchangeRateCache(
      base,
      exchange,
    );

    this.logger.debug(`exchangeRatesCache: ${exchangeRatesCache}`);

    if (exchangeRatesCache) {
      return { rate: exchangeRatesCache };
    }

    const currentExchangeRate = await this.getCurrentExchangeRate();
    await this.cacheService.setExchangeRateCache(
      currentExchangeRate,
      base,
      exchange,
    );

    return { rate: currentExchangeRate };
  }

  private async getCurrentExchangeRate(): Promise<number | null> {
    const URL = this.configService.get('EXCHANGE_RATE_API_URL');
    const KEY = this.configService.get('EXCHANGE_RATE_API_KEY');

    const { data } = await firstValueFrom<{ data: ExchangeApiResponse }>(
      this.httpService
        .get<ExchangeApiResponse>(URL, {
          headers: {
            'x-api-key': KEY,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            return of({ data: { exchange_rate: DEFAULT_EXCHANG_RATE } });
          }),
        ),
    );

    return data.exchange_rate;
  }
}
