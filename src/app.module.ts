import { UserModule } from './user/user.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BullModule } from '@nestjs/bull';

import { User } from './entities/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User],
      autoLoadEntities: true,
      synchronize: process.env?.NODE_ENV !== 'prod' ? true : false,
    }),
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
