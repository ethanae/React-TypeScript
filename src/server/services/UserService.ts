import UserRepository from "../data/UserRepository";
import { UserEntity } from "../data/schemas/User";
import { IUser } from '../common/interfaces/IUser';

class UserService {
  async getUserByIdNumber(idNumber: string): Promise<UserEntity> {
    try {
      return await UserRepository.getUserByIdNumber(idNumber);
    } catch (error) {
      console.log('error in user service', error);
    }
  }

  async findUsers(query: object): Promise<Array<UserEntity>> {
    return await UserRepository.findUsers(query).catch(err => {
      console.log('error in user service => findUsers', err);
      throw err;
    });
  }

  async createUser(user: object): Promise<[boolean, string]> {
    try {
      const newUser = <UserEntity>user;
      if(await UserRepository.insertUser(newUser))
        return [true, 'User created'];
    } catch (error) {
      console.log('error in user service', error);
      return [false, 'An error occurred'];
    }
  }

  async deleteUserByIdNumber(idNumber: string): Promise<boolean> {
    try {
      return await UserRepository.deleteUserByIdNumber(idNumber);
    } catch (error) {
      return false;
    }
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const users = await UserRepository.getUsers();
      return users.map(user => {
        user = user.toObject();
        delete user._id;
        delete user.__v;
        return user;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new UserService();