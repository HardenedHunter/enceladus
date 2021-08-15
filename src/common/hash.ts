import bcrypt from 'bcrypt';
import env from './env';

export const encrypt = async (target: string) => {
  const salt = await bcrypt.genSalt(parseInt(env.get('hashCycles')));
  return await bcrypt.hash(target, salt);
};

export const validate = async (target: string, encrypted: string) => {
  return await bcrypt.compare(target, encrypted);
};

export default {
  encrypt,
  validate,
};
