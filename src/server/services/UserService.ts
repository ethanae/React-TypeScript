import UserRepository from "../data/UserRepository";
import { UserEntity } from "../data/schemas/User";

class UserService {
  public async getUserByIdNumber(idNumber: string): Promise<UserEntity> {
    try {
      return await UserRepository.getUserByIdNumber(idNumber);
    } catch (error) {
      console.log('error in user service', error);
    }
  }

  public async createUser(user: object): Promise<[boolean, string]> {
    try {
      const newUser = <UserEntity>user;
      if(await UserRepository.insertUser(newUser))
        return [true, 'User created'];
    } catch (error) {
      console.log('error in user service', error);
      return [false, 'An error occurred'];
    }
  }

  public async deleteUserByIdNumber(idNumber: string): Promise<boolean> {
    try {
      return await UserRepository.deleteUserByIdNumber(idNumber);
    } catch (error) {
      return false;
    }
  }
}

export default new UserService();