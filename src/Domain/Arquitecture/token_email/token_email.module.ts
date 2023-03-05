import { Module } from '@nestjs/common';
import { TokenEmailService } from './token_email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token_Email, Token_EmailSchema } from '../../schemas/Tokens-emails';
import { EmailFactoryService } from '../email-factory/email-factory.service';
import { TokenEmailController } from './token_email.controller';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Token_Email.name,
    schema: Token_EmailSchema
  }])],
  providers: [TokenEmailService, EmailFactoryService],
  controllers: [TokenEmailController],
  exports: [TokenEmailService]
})
export class TokenEmailModule {}
