import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { RoomCapacity } from '../types';
import { User } from 'src/users/models/user.model';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true, _id: true })
export class Room {
  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
  customer: User;

  @Prop({ required: true })
  number: number;

  @Prop()
  description: string;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;

  @Prop({ required: true, enum: RoomCapacity })
  capacity: RoomCapacity;

  @Prop({ default: true })
  available: boolean;

  @Prop([String])
  images: string[];

  @Prop()
  photoUrl: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
