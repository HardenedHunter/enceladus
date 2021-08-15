import { v4 as uuidv4 } from 'uuid';
import sequelize from '../common/db';
import {
  InvalidCredentialsError,
  InvalidRefreshTokenError,
} from '../common/error';
import { validate } from '../common/hash';
import Profile from '../models/profile';
import RefreshToken from '../models/refreshToken';

const generateRefreshToken = () => uuidv4();

export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export const REFRESH_TOKEN_TTL = 1000 * 60 * 60 * 24 * 30; // 30 days in millis

export const REFRESH_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: false,
  maxAge: REFRESH_TOKEN_TTL,
};

export const createTokens = async (profile: Profile) => {
  const refreshToken = generateRefreshToken();
  await RefreshToken.create({
    profileId: profile.profileId,
    token: refreshToken,
    expiresAt: Date.now() + REFRESH_TOKEN_TTL,
  });

  const accessToken = profile.generateAccessToken();
  return { refreshToken, accessToken };
};

export const authorizeWithCredentials = async (
  username: string,
  password: string
) => {
  const profile = await Profile.findOne({ where: { username } });
  if (!profile || !profile.password) throw new InvalidCredentialsError();

  const isValid = await validate(password, profile.password);
  if (!isValid) throw new InvalidCredentialsError();

  return createTokens(profile);
};

export const refresh = async (oldRefreshToken: string) => {
  const refreshToken = await RefreshToken.findOne({
    where: { token: oldRefreshToken },
  });
  if (!refreshToken) throw new InvalidRefreshTokenError();

  if (refreshToken.expiresAt < Date.now()) {
    await refreshToken.destroy();
    throw new InvalidRefreshTokenError('Refresh token has expired.');
  }

  const newRefreshToken = generateRefreshToken();
  await sequelize.transaction(async (transaction) => {
    await refreshToken.destroy({ transaction });

    await RefreshToken.create(
      {
        profileId: refreshToken.profileId,
        token: newRefreshToken,
        expiresAt: Date.now() + REFRESH_TOKEN_TTL,
      },
      { transaction }
    );
  });

  const profile = await Profile.findOne({
    where: { profileId: refreshToken.profileId },
  });
  const accessToken = profile!.generateAccessToken();

  return { refreshToken: newRefreshToken, accessToken };
};

export default {
  refresh,
  authorizeWithCredentials,
  createTokens,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_OPTIONS,
  REFRESH_TOKEN_TTL,
};
