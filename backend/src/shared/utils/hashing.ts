import * as bcrypt from 'bcrypt';

export default class PasswordHelper {
  static saltOrRounds = 10;
  static regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  static getPasswordHash = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, this.saltOrRounds);
    console.log('Hash:', hash);
    return hash;
  };

  static compareHash = async (
    hash: string,
    password: string,
  ): Promise<boolean> => {
    const isMatch = await bcrypt.compare(hash, password);
    console.log('Password match:', isMatch);
    return isMatch;
  };

  static validatePassword = (password: string): boolean =>
    this.regex.test(password);
}
