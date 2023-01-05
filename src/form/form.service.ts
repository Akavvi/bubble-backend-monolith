import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFormDto } from './dto';

@Injectable()
export class FormService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UserService,
  ) {}
  private readonly form = this.prisma.form;

  async create({ name, style }: CreateFormDto, ownerId: number) {
    return this.form.create({
      data: {
        name,
        ownerId,
        style: {
          create: {
            hexColor: style.hexColor,
            backgroundHexColors: style.backgroundHexColors,
            fonts: {
              create: style.fonts,
            },
          },
        },
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

  async findById(id: number) {
    return this.form.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
