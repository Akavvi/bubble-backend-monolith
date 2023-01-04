import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  controllers: [FormController],
  providers: [FormService],
  imports: [UserModule],
})
export class FormModule {}
