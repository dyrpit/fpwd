import { Module } from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { ConfigModule } from '@nestjs/config';
import { ExchangeModule } from './exchange/exchange.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
