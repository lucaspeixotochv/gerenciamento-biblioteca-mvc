import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { PrismaService } from 'src/database/prisma.service';
import { BooksController } from './books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
  exports: [BooksService],
})
export class BooksModule {}
