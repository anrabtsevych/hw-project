import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/users/models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { collection: 'Auth', name: Auth.name, schema: AuthSchema },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
