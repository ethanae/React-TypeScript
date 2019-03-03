import { User, UserEntity } from "../data/schemas/User";

class UserRepository {
  
  async getUserByIdNumber(idNumber: string): Promise<UserEntity> {
    try {
      return await User.findOne({ idNumber: idNumber });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findUsers(query: object): Promise<Array<UserEntity>> {
    const users = await User.find(query).catch(err => {
      console.log(err);
      throw err;
    });

    return users;
  }

  async insertUser(user: UserEntity): Promise<boolean> {
    try {
      return !!(await User.create(user));
    } catch (error) {
      console.log(error);
      if(error.message.includes('duplicate'))
        throw new Error('User already exists');
    }
  }

  async deleteUserByIdNumber(idNumber: string): Promise<boolean> {
    try {
      return !!(await User.deleteOne({ idNumber: idNumber }));
    } catch (error) {
      return false;
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    try {
      return await User.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new UserRepository();

