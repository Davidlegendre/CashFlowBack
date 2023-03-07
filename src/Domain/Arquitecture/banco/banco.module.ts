import { Module } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoController } from './banco.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banco, BancoSchema } from '../../schemas/Banco-mode';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Banco.name,
    schema: BancoSchema,
    collection: 'Banco'
  }])],
  providers: [BancoService],
  controllers: [BancoController],
  exports: [BancoService]
})
export class BancoModule {}
