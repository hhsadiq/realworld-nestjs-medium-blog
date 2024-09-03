import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@src/users/domain/user';

import { Favorite } from './domain/favorite';
import { CreatefavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'favorites',
  version: '1',
})
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Favorite,
  })
  addToFavorites(
    @Body() createfavoriteDto: CreatefavoriteDto,
    @Request() request,
  ) {
    return this.favoritesService.addToFavorites(
      request.user.id,
      createfavoriteDto,
    );
  }

  @Get(':id/user')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  getFavoritesForUser(@Param('id') id: User['id']) {
    return this.favoritesService.getFavoritesForUser(id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
