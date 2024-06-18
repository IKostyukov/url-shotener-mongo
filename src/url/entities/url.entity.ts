import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop({ required: true })
  originalUrl: string;

  @Prop(/*{ required: true }*/)
  encodedUrl: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
