import { Profile } from '@src/profiles/domain/profile';
import { DeepPartial } from '@src/utils/types/deep-partial.type';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

export abstract class ProfileRepository {
  abstract create(
    data: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Profile>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Profile[]>;

  abstract findById(id: Profile['id']): Promise<NullableType<Profile>>;

  abstract update(
    id: Profile['id'],
    payload: DeepPartial<Profile>,
  ): Promise<Profile | null>;

  abstract remove(id: Profile['id']): Promise<void>;

  abstract followProfile(userID: string, followerId: string): Promise<Profile>;

  abstract unfollowProfile(username: string, followerId: string): Promise<void>;
}
