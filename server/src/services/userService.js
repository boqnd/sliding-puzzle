import { UserModel } from '../models/user-model.js';

class UserService {
  async create(user) {
    return await UserModel.query().insertAndFetch({
      username: user.username,
      password: user.password,
    });
  }

  async getAll() {
    return await UserModel.query();
  }

  async findByPk(id) {
    return await UserModel.query().findById(id).throwIfNotFound();
  }

  async findByUsername(username) {
    return await UserModel.query().where({username});
  }

  async update(id, user) {
    return await UserModel.query()
      .patchAndFetchById(id, {
        username: user.username,
        password: user.password,
      })
      .throwIfNotFound();
  }

  async delete(id) {
    return await UserModel.query().deleteById(id).throwIfNotFound();
  }
}

export const userService = new UserService();
