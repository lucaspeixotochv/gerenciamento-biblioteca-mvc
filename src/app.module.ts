import { Module } from '@nestjs/common';
import { ViewModule } from './app/view/view.module';
import { BooksModule } from './app/books/books.module';
@Module({
  imports: [ViewModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
