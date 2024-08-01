import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { FiltersModule } from './common/filters/filters.module';
import { MiddlewaresModule } from './common/middlewares/middlewares.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    UsersModule,
    DatabaseModule,
    LoggerModule,
    InterceptorsModule,
    FiltersModule,
    MiddlewaresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
