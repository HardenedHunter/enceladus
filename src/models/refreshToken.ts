import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  AllowNull,
  Unique,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Profile from './profile';

@Table({ tableName: 'refresh_token' })
export default class RefreshToken extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER, field: 'refresh_token_id' })
  refreshTokenId: number;

  @ForeignKey(() => Profile)
  @AllowNull(false)
  @Column({ type: DataTypes.INTEGER, field: 'profile_id' })
  profileId: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataTypes.STRING, field: 'token' })
  token: string;

  @AllowNull(false)
  @Column({ type: DataTypes.BIGINT, field: 'expires_at' })
  expiresAt: number;

  @BelongsTo(() => Profile)
  profile: Profile;
}
