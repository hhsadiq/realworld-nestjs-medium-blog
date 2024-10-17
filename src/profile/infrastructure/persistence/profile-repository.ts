import { Profile } from '@src/profile/domain/profile';
import { FollowDto } from '@src/profile/dto/follow.dto';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class ProfileAbstractRepository {
  abstract followProfile(
    followDto: FollowDto,
    user: User,
  ): Promise<NullableType<Profile>>;

  abstract unfollowProfile(
    followDto: FollowDto,
    userPofile: User,
  ): Promise<NullableType<Profile>>;

  abstract Allfollowers(userId: number): Promise<NullableType<number[]>>;
}
