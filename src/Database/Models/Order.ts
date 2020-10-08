import { model, Schema } from 'mongoose';

const schema = new Schema<IOrder>({
  name: {
    type: Schema.Types.String,
    trim: true,
    required: true
  }
});

export default class Order {
  protected static readonly _schema = model('Order', schema, 'Orders');

  public static async findOneByName(name: string): Promise<IOrder | null> {
    return await this._schema.findOne({ name }) as IOrder | null;
  }

  static async createOrder(order: IOrder): Promise<any> {
    await this._schema.findOneAndUpdate(
      {
        name: order.name
      },
      {
        name: order.name
      },
      {
        new: true,
        upsert: true
      }
    );
  }
}

//region Interfaces
export interface IOrder {
  name: string
}

//endregion