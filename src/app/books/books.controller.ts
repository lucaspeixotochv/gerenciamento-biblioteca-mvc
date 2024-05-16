import { Controller, Post, Render, Req } from '@nestjs/common';
import { BooksService } from '../books/books.service';

@Controller()
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('books/borrow')
  @Render('borrow')
  async borrowBook(@Req() request) {
    const { bookId } = request.body;
    const message = await this.booksService.borrowBook(parseInt(bookId));
    return { message };
  }

  @Post('add-book')
  @Render('add-book')
  async addBook(@Req() request) {
    const { title, author } = request.body;
    const message = await this.booksService.addBook(title, author);
    return { message };
  }

  @Post('return-book')
  @Render('return-book')
  async returnBook(@Req() request) {
    const { bookId } = request.body;
    const message = await this.booksService.returnBook(parseInt(bookId));
    return { message };
  }
}
