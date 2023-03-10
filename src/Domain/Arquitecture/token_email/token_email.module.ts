import { Module } from '@nestjs/common';
import { TokenEmailService } from './token_email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token_Email, Token_EmailSchema } from '../../schemas/Tokens-emails';
import { TokenEmailController } from './token_email.controller';
import { EmailFactoryModule } from '../email-factory/email-factory.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Token_Email.name,
    schema: Token_EmailSchema
  }]), EmailFactoryModule],
  providers: [TokenEmailService],
  controllers: [TokenEmailController],
  exports: [TokenEmailService]
})
export class TokenEmailModule {}
