import { Model } from 'objection';

export class BaseModel extends Model {
  id;
  createdAt;
  updatedAt;

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async $beforeUpdate() {
    this.updatedAt = new Date();
  }
}