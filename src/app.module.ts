import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { AvailabilityModule } from './availability/availability.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    RoomModule,
    AvailabilityModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoConnectionString = configService.get<string>(
          'MONGO_CONNECTION_STRING',
        );
        return {
          uri: mongoConnectionString,
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
