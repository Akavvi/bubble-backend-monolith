import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFormDto } from './dto';
import { generateHexColor } from './lib';

@Injectable()
export class FormService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UserService,
  ) {}
  private readonly form = this.prisma.form;

  async create(
    { name, hexColor = generateHexColor() }: CreateFormDto,
    email: string,
  ) {
    const owner = await this.users.findByEmail(email);
    return this.form.create({
      data: {
        name,
        hexColor,
        ownerId: owner.id,
      },
    });
  }

  async findByPublicId(uuid: string) {
    return this.form.findFirstOrThrow({
      where: {
        publicId: uuid,
      },
    });
  }
}
