import { Follow } from '@src/profiles/domain/profiles';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class FollowRepository {
  abstract follow(followerId: number, username: string): Promise<Follow>;

  abstract unfollow(followerId: number, username: string): Promise<void>;

  abstract findByFollowerAndFollowing(
    followerId: number,
    followingId: number,
  ): Promise<NullableType<Follow>>;
}
