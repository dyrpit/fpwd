import { Injectable } from '@nestjs/common';
import Keyv from 'keyv';

import { BaseCurrency, ExchangeCurrency, Transaction } from 'src/types/types';

@Injectable()
export class CacheService {
  private exchangeRateCache: Keyv<number | undefined>;
  private transactionCache: Keyv<Transaction[]>;

  constructor() {
    this.exchangeRateCache = new Keyv({ ttl: 60 * 1000 }); // 60 seconds
    this.transactionCache = new Keyv({ ttl: Number.MAX_SAFE_INTEGER });
  }

  async getExchangeRateCache(
    baseCurrency: BaseCurrency,
    exchangeCurrency: ExchangeCurrency,
  ) {
    return this.exchangeRateCache.get(`${baseCurrency}_${exchangeCurrency}`);
  }

  async setExchangeRateCache(
    exchangeRate: number,
    baseCurrency: BaseCurrency,
    exchangeCurrency: ExchangeCurrency,
  ) {
    return this.exchangeRateCache.set(
      `${baseCurrency}_${exchangeCurrency}`,
      exchangeRate,
    );
  }

  async saveTransaction(transaction: Transaction) {
    if (!(await this.transactionCache.has(`transactions`))) {
      await this.transactionCache.set(`transactions`, [transaction]);
    }

    const transactions = await this.transactionCache.get(`transactions`);
    transactions.push(transaction);
    await this.transactionCache.set(`transactions`, transactions);

    return transaction;
  }

  async getTransactions() {
    return this.transactionCache.get(`transactions`);
  }
}
