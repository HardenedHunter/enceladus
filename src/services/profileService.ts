import { UniqueConstraintError } from 'sequelize';
import { EntityAlreadyExistsError } from '../common/error';
import { encrypt } from '../common/hash';
import Profile from '../models/profile';

export const create = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await encrypt(password);
  try {
    const profile = await Profile.create({
      username,
      email,
      password: hashedPassword,
    });
    return profile;
  } catch (e) {
    if (e instanceof UniqueConstraintError)
      throw new EntityAlreadyExistsError(
        'Profile with this email already exists'
      );
    throw e;
  }
};

export default {
  create,
};
