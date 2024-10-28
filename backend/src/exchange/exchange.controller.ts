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

  @Get('transactions')
  async getTransactions() {
    return this.exchangeService.getTransactions();
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
