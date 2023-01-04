import { Form, PermissionMode, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto';

export class FormDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  is_public: boolean;

  @ApiProperty({ enum: ['VIEW', 'EDIT'] })
  permission_mode: PermissionMode;

  @ApiProperty({ required: false, type: () => UserDto })
  owner?: UserDto;

  constructor(partial: Partial<Form & { owner?: User }>) {
    this.id = partial.publicId;
    this.name = partial.name;
    this.color = partial.hexColor;
    this.is_public = partial.isPublic;
    this.permission_mode = partial.permissionMode;

    if (partial.owner) {
      this.owner = new UserDto(partial.owner);
    }
  }
}
