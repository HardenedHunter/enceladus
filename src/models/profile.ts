import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  AllowNull,
  Unique,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import jwt from 'jsonwebtoken';
import env from '../common/env';
import SocialAccount from './socialAccount';
import RefreshToken from './refreshToken';

export interface ProfileTokenPayload {
  profileId: number;
}

@Table({ tableName: 'profile' })
export default class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER, field: 'profile_id' })
  profileId: number;

  @Unique
  @AllowNull(false)
  @Column(DataTypes.STRING)
  email: string;

  @HasMany(() => SocialAccount, { onDelete: 'CASCADE', hooks: true })
  socialAccounts: SocialAccount[];

  @HasMany(() => RefreshToken, { onDelete: 'CASCADE', hooks: true })
  resreshTokens: RefreshToken[];

  generateAccessToken() {
    const payload: ProfileTokenPayload = {
      profileId: this.profileId,
    };
    return jwt.sign(payload, env.get('jwtPrivateKey'), { expiresIn: '30m' });
  }
}
