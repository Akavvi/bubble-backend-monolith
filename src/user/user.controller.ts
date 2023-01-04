import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../common/guards';
import { User } from '../common/decorators';
import { UserWithFormsDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserWithFormsDto })
  @UseGuards(JwtGuard)
  @Get()
  async getUser(@User('sub') userId: number) {
    const user = await this.userService.findWithForms(userId);
    return new UserWithFormsDto(user);
  }
}
