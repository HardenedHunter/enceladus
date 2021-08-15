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
import RefreshToken from './refreshToken';

export interface ProfileTokenPayload {
  profileId: number;
  username: string;
}

@Table({ timestamps: false, tableName: 'profile' })
export default class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER, field: 'profile_id' })
  profileId: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  username: string;

  @Unique
  @AllowNull(false)
  @Column(DataTypes.STRING)
  email: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  password?: string;

  @HasMany(() => RefreshToken, { onDelete: 'CASCADE', hooks: true })
  resreshTokens: RefreshToken[];

  generateAccessToken() {
    const payload: ProfileTokenPayload = {
      profileId: this.profileId,
      username: this.username,
    };
    return jwt.sign(payload, env.get('jwtPrivateKey'), { expiresIn: '30m' });
  }
}
