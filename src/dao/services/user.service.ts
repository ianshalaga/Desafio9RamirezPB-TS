import { usersModel } from "../models/users.model";
// Interfaces
import User from "../../interfaces/User";
import dbUser from "../../interfaces/dbUser";

class UserService {
  constructor() {}

  // @@@@
  async getUser(email: string): Promise<dbUser> {
    try {
      const dbUser: dbUser = await usersModel.findOne({ email: email });
      return dbUser;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getUserById(id: string): Promise<dbUser> {
    try {
      const dbUser: dbUser = await usersModel.findById(id);
      return dbUser;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async createUser(newUser: User): Promise<dbUser> {
    try {
      const result: dbUser = (await usersModel.create(newUser)).toObject();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
