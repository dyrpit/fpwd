import { Module } from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { ConfigModule } from '@nestjs/config';
import { ExchangeModule } from './exchange/exchange.module';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService, SchedulerService],
})
export class AppModule {}
