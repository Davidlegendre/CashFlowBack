import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genero } from 'src/Domain/schemas/Genero-model';
import { GeneroSchema } from '../../schemas/Genero-model';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Genero.name,
    schema: GeneroSchema,
    collection: 'Genero'
  }])],
  providers: [GeneroService],
  controllers: [GeneroController]
})
export class GeneroModule {}
