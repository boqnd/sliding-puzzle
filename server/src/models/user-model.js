import { BaseModel } from './base-model.js';

export class UserModel extends BaseModel {
  static get tableName() {
    return 'users';
  }

  fullName;
  email;
}
