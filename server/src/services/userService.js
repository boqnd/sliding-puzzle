import { UserModel } from '../models/user-model.js';

class UserService {
  async create(user) {
    return await UserModel.query().insertAndFetch({
      email: user.email,
      fullName: user.fullName,
    });
  }

  async getAll() {
    return await UserModel.query();
  }

  async findByPk(id) {
    return await UserModel.query().findById(id).throwIfNotFound();
  }

  async update(id, user) {
    return await UserModel.query()
      .patchAndFetchById(id, {
        email: user.email,
        fullName: user.fullName,
      })
      .throwIfNotFound();
  }

  async delete(id) {
    return await UserModel.query().deleteById(id).throwIfNotFound();
  }
}

export const userService = new UserService();
