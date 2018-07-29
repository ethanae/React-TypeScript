import { User, UserEntity } from "../data/schemas/User";

class UserRepository {
  
  public async getUserByIdNumber(idNumber: string): Promise<UserEntity> {
    try {
      return await User.findOne({ idNumber: idNumber });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async insertUser(user: UserEntity): Promise<boolean> {
    try {
      return !!(await User.create(user));
    } catch (error) {
      console.log(error);
      if(error.message.includes('duplicate'))
        throw new Error('User already exists');
    }
  }

  public async deleteUserByIdNumber(idNumber: string): Promise<boolean> {
    try {
      return !!(await User.deleteOne({ idNumber: idNumber }));
    } catch (error) {
      return false;
    }
  }
}

export default new UserRepository();

