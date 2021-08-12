import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Profile from './profile';

export type SocialProvider = 'VK';

@Table({ tableName: 'social_account' })
export default class SocialAccount extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataTypes.STRING, field: 'social_provider' })
  socialProvider: string;

  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataTypes.STRING, field: 'social_user_id' })
  socialUserId: string;

  @ForeignKey(() => Profile)
  @AllowNull(false)
  @Column({ type: DataTypes.INTEGER, field: 'profile_id' })
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Profile;
}
