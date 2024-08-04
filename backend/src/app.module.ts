import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { FiltersModule } from './common/filters/filters.module';
import { MiddlewaresModule } from './common/middlewares/middlewares.module';
import { AuthModule } from './modules/auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [
    // Todo: Instead of using in main.ts use Filter in here
    // {
    //   provide: ,
    //   useClass: ,
    // }
  ],
})
export class AppModule {}
