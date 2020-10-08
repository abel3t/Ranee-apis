import { model } from 'mongoose';

import { IProduct, IProductRegister } from 'Database/Interfaces';
import logger from 'Core/Logger';
import { schema } from 'Database/Interfaces/User';


export default class Product {
  protected static readonly _schema = model('Product', schema, 'Products');

  public static async addCustomer(user: IProductRegister): Promise<IProduct> {
    const existedProduct = await this._schema.findOne({
      active: true,
    });

    if (existedProduct) {
      throw new Error();
    }

    return await this.save(user)
      .then(data => data as IProduct)
      .catch(error => {
        logger.info(error);
        throw new Error('ABC');
      });
  }

  private static save(user: IProductRegister): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      const userModel = new this._schema(user);
      userModel.save()
        .then((data: any) => resolve(data))
        .catch(error => reject(error));
    });
  }
}