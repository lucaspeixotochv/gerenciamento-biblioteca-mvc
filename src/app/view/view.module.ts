import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { BooksService } from '../books/books.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ViewController],
  providers: [BooksService, PrismaService],
})
export class ViewModule {}
