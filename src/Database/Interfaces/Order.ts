import { Schema } from 'mongoose';

export interface IOrder {
  name: string,
  type: string
}

export const schema = new Schema<IOrder>({
  name: {
    type: Schema.Types.String,
    trim: true
  },
  type: {
    type: Schema.Types.String,
    trim: true
  }
});

export interface IOrderRegister {
  name: string,
  type: string,
}