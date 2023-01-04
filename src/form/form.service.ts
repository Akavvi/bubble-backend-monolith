import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UserService,
  ) {}
  private readonly form = this.prisma.form;

  async create(
    {
      name,
      hexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Выглядит как говно, на самом деле работает прекрасно. Можно поменять в будущем, но ты сразу ебни вариантик в Utils классе, а пока так дефолт ебнем
    }: CreateFormDto,
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
