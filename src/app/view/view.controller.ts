import { Controller, Get, Post, Query, Render, Req } from '@nestjs/common';
import { BooksService } from '../books/books.service';

@Controller()
export class ViewController {
  constructor(private booksService: BooksService) {}

  @Get()
  @Render('index')
  async home() {
    const books = await this.booksService.findAll();
    return { books };
  }

  @Get('/search')
  @Render('search')
  async searchBooks(@Query('searchTerm') searchTerm: string) {
    const searchResults = await this.booksService.searchBooks(searchTerm);
    return { searchResults, searchTerm };
  }

  @Get('borrow')
  @Render('borrow')
  renderBorrowPage(@Req() request) {
    const { message } = request.query;
    return { message };
  }

  @Post('books/borrow')
  @Render('borrow')
  async borrowBook(@Req() request) {
    const { bookId } = request.body;
    const message = await this.booksService.borrowBook(parseInt(bookId));
    return { message };
  }

  @Get('add-book')
  @Render('add-book')
  renderAddBookPage(@Req() request) {
    const { message } = request.query;
    return { message };
  }

  @Post('add-book')
  @Render('add-book')
  async addBook(@Req() request) {
    const { title, author } = request.body;
    const message = await this.booksService.addBook(title, author);
    return { message };
  }

  @Get('return-book')
  @Render('return-book')
  renderReturnBookPage(@Req() request) {
    const { message } = request.query;
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
