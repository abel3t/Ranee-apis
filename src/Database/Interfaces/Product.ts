import { Schema } from 'mongoose';

export interface IProduct {
  name: string,
  type: string,
  shortDescription: string,
  fullDescription: string,
  vendorId: string,
  keywords: string,
  isTaxExempt: boolean,
  price: number,
  oldPrice: number,
  catalogPrice: number,
  weight: number,
  length: number,
  width: number,
  height: number,
  createdAt: Date,
  updatedAt: Date,
  published: boolean,
  sold: number,
  viewed: number,
  onSale: number,
  status: boolean,
  pictures: Array<string>
}

export const schema = new Schema<IProduct>({
  name: {
    type: Schema.Types.String,
    trim: true
  },
  type: {
    type: Schema.Types.String,
    trim: true
  },
  shortDescription: {
    type: Schema.Types.String,
    trim: true
  },
  fullDescription: {
    type: Schema.Types.String,
    trim: true
  },
  vendorId: {
    type: Schema.Types.String,
    trim: true
  },
  keywords: {
    type: Schema.Types.String,
    trim: true
  },
  isTaxExempt: { type: Schema.Types.Boolean },
  price: { type: Schema.Types.Number },
  oldPrice: { type: Schema.Types.Number },
  catalogPrice: { type: Schema.Types.Number },
  weight: { type: Schema.Types.Number },
  length: { type: Schema.Types.Number },
  width: { type: Schema.Types.Number },
  height: { type: Schema.Types.Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  published: { type: Schema.Types.Boolean },
  sold: { type: Schema.Types.Number },
  viewed: { type: Schema.Types.Number },
  onSale: { type: Schema.Types.Number },
  status: { type: Schema.Types.Boolean },
  pictures: [ { type: String, trim: true } ]
});

export interface IProductRegister {
  name: string,
  type: string,
  shortDescription: string,
}