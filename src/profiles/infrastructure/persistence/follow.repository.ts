import { Follow } from '@src/profiles/domain/profiles';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class FollowRepository {
  abstract createFollow(
    followerId: number,
    followingId: number,
  ): Promise<Follow>;
  abstract deleteFollow(followerId: number, followingId: number): Promise<void>;
  abstract findByFollowerAndFollowing(
    followerId: number,
    followingId: number,
  ): Promise<NullableType<Follow>>;
}
