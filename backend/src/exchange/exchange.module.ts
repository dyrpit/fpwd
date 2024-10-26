import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { HttpModule } from '@nestjs/axios';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService],
  imports: [CacheModule, HttpModule],
  exports: [ExchangeService],
})
export class ExchangeModule {}
