import { UserModule } from './user/user.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BullModule } from '@nestjs/bull';
import { typeOrmConfig } from '../typeorm.config';

import { User } from './entities/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // auth
      .apply()
      .exclude(
        { path: '/health-check', method: RequestMethod.ALL },
        { path: '/user', method: RequestMethod.POST },
        { path: '/user/all', method: RequestMethod.GET },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
