import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ExchangeService } from 'src/exchange/exchange.service';
import { BASE_CURRENCY, EXCHANGE_CURRENCY } from 'src/types/types';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly exchangeService: ExchangeService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async updateExchangeRates() {
    this.logger.debug('Starting scheduled exchange rate update');
    try {
      const rate = await this.exchangeService.getExchangeRates(
        BASE_CURRENCY.EUR,
        EXCHANGE_CURRENCY.PLN,
      );
      this.logger.debug(`Exchange rate updated: ${JSON.stringify(rate)}`);
    } catch (error) {
      this.logger.error('Failed to update exchange rate:', error);
    }
  }
}
