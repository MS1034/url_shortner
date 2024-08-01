import * as bcrypt from 'bcrypt';

export default class HashingHelper {
  static saltOrRounds = 10;
  static getPasswordHash = async (password: string): Promise<string> =>
    await bcrypt.hash(password, this.saltOrRounds);
}
