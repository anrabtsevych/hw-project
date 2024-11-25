import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Room } from 'src/room/models/room.model';
import { User } from 'src/users/models/user.model';

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true, _id: true })
export class Availability {
  @Prop({ type: MSchema.Types.ObjectId, ref: User.name })
  customer: User;

  @Prop({ type: MSchema.Types.ObjectId, ref: Room.name })
  room: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
