import { Injectable } from '@nestjs/common';

import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '@src/common/exceptions';
import { UsersService } from '@src/users/users.service';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

import { Profile } from './domain/profile';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './infrastructure/persistence/profile.repository';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UsersService,
  ) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.profileRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Profile['id']) {
    return this.findAndValidate('id', id);
  }

  update(id: Profile['id'], updateProfileDto: UpdateProfileDto) {
    const profile = this.profileRepository.update(id, updateProfileDto);
    if (!profile) {
      throw NOT_FOUND('Profile', { id });
    }
    return;
  }

  remove(id: Profile['id']) {
    return this.profileRepository.remove(id);
  }

  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // captilize first letter of the field name
    if (typeof this.profileRepository[repoFunction] !== 'function') {
      throw UNPROCESSABLE_ENTITY(
        `Method ${repoFunction} not found on profile repository.`,
        field,
      );
    }

    const profile = await this.profileRepository[repoFunction](value);
    if (!profile) {
      throw NOT_FOUND('Profile', { [field]: value });
    }
    return profile;
  }

  async followProfile(username: string, followerId: string): Promise<Profile> {
    const findUser = await this.userService.findByEmail(username);
    if (!findUser) {
      throw NOT_FOUND('Email not exist', { username });
    }
    const userID = String(findUser.id);
    const profile = await this.profileRepository.followProfile(
      userID,
      followerId,
    );
    if (!profile) {
      throw NOT_FOUND('Profile not created', { username });
    }
    return profile;
  }

  async unfollowProfile(username: string, followerId: string): Promise<void> {
    return await this.profileRepository.unfollowProfile(username, followerId);
  }
}
