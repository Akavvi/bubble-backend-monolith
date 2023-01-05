import { Form, PermissionMode } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FormDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  is_public: boolean;

  @ApiProperty({ enum: ['VIEW', 'EDIT'] })
  permission_mode: PermissionMode;

  constructor(partial: Partial<Form>) {
    this.id = partial.publicId;
    this.name = partial.name;
    this.description = partial.description;
    this.is_public = partial.isPublic;
    this.permission_mode = partial.permissionMode;
  }
}
