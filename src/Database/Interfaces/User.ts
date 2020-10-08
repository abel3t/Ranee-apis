//region Enums
import { Schema } from 'mongoose';

export enum AddressTypes {
  HomeApartment,
  OrganCompany
}

//endregion
export interface IUserSignUp {
  name: string,
  userName: string,
  email: string,
  hash: string,
  salt: string,
  profilePictureUrl?: string,
  deleted?: boolean,
  active?: boolean,
  lastLogin?: Date,
  lastActivity?: Date,
  createdAt?: Date,
  UpdatedAt?: Date,
  role: string,
  shoppingCartItems?: Array<IShoppingCartItem>,
  shippingAddresses?: Array<IShippingAddress>
}

//region Interfaces
export interface IUser {
  _id: string,
  name: string,
  userName: string,
  email: string,
  hash: string,
  salt: string,
  profilePictureUrl?: string,
  deleted?: boolean,
  active?: boolean,
  lastLogin?: Date,
  lastActivity?: Date,
  createdAt?: Date,
  UpdatedAt?: Date,
  role: string,
  shoppingCartItems?: Array<IShoppingCartItem>,
  shippingAddresses?: Array<IShippingAddress>
}

interface IShoppingCartItem {
  productId: string,
  quantity: number,
  createdAt?: Date
}

export interface IShippingAddress {
  address: string;
  districtTown: string;
  name: string;
  phone: string;
  provinceCity: string;
  type: AddressTypes;
  wardCommune: string;
}

//endregion

export const schema = new Schema<IUser>({
  name: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  userName: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  email: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  hash: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  salt: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  profilePictureUrl: {
    type: Schema.Types.String,
    trim: true
  },
  deleted: {
    type: Schema.Types.Boolean,
    default: false
  },
  active: {
    type: Schema.Types.Boolean,
    default: true
  },
  lastLogin: { type: Schema.Types.Date },
  lastActivity: { type: Schema.Types.Date },
  createdAt: { type: Schema.Types.Date },
  UpdatedAt: { type: Schema.Types.Date },
  role: { type: Schema.Types.String },
  shoppingCartItems: [
    {
      productId: {
        type: Schema.Types.String, trim: true, required: true, ref: 'Product',
      },
    }
  ],
  shippingAddresses: [
    {
      address: {
        type: Schema.Types.String,
        trim: true
      },
      districtTown: {
        type: Schema.Types.String,
        trim: true
      },
      name: {
        type: Schema.Types.String,
        trim: true
      },
      phone: {
        type: Schema.Types.String,
        trim: true
      },
      provinceCity: {
        type: Schema.Types.String,
        trim: true
      },
      type: {
        type: Schema.Types.String,
        enum: [ 0, 1 ]
      },
      wardCommune: {
        type: Schema.Types.String,
        trim: true
      },
    }
  ],
});