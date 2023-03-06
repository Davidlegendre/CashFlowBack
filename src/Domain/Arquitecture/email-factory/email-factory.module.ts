import { Module } from '@nestjs/common';
import { EmailFactoryService } from './email-factory.service';

@Module({
  providers: [EmailFactoryService],
  exports: [EmailFactoryService]
})
export class EmailFactoryModule {}
