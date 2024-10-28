import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { ExchangeService } from './exchange.service';

import {
  ExchangeRatesDto,
  ExchangeRatesSchema,
} from './dto/exchange-rates.dto';
import { ExchangeDto, ExchangeSchema } from './dto/exchange.dto';

import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(ExchangeSchema))
  async performExchangeTransaction(
    @Body()
    { base, exchange, exchangeValue }: ExchangeDto,
  ) {
    return this.exchangeService.exchangeCurrency(base, exchange, exchangeValue);
  }

  @Get('transaction')
  async getTransaction() {
    return this.exchangeService.getTransaction();
  }

  @Post('rates')
  @UsePipes(new ZodValidationPipe(ExchangeRatesSchema))
  async getExchangeRates(
    @Body()
    { base, exchange }: ExchangeRatesDto,
  ) {
    return this.exchangeService.getExchangeRates(base, exchange);
  }
}
