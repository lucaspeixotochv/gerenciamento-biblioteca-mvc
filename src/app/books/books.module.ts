import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [],
  providers: [BooksService, PrismaService],
  exports: [BooksService],
})
export class BooksModule {}
