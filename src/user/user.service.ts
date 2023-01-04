import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { USER_ALREADY_EXISTS_ERROR } from './constants';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly user = this.prismaService.user;

  async findWithForms(id: number) {
    return this.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        forms: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.user.findFirstOrThrow({
      where: {
        email,
      },
    });
  }

  async find(id: number) {
    return this.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async create(email: string, passwordHash: string) {
    const user = await this.findByEmail(email);
    if (user) {
      throw new ForbiddenException(USER_ALREADY_EXISTS_ERROR);
    }

    return this.user.create({
      data: {
        email,
        passwordHash,
      },
    });
  }

  async updateRefreshTokenHash(id: number, refreshTokenHash: string) {
    return this.user.update({
      where: {
        id,
      },
      data: {
        refreshTokenHash,
      },
    });
  }

  async clearRefreshTokenHash(id: number) {
    return this.user.updateMany({
      where: {
        id,
        refreshTokenHash: {
          not: null,
        },
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }
}
