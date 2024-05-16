import { Controller, Get, Query, Render, Req } from '@nestjs/common';
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

  @Get('add-book')
  @Render('add-book')
  renderAddBookPage(@Req() request) {
    const { message } = request.query;
    return { message };
  }

  @Get('return-book')
  @Render('return-book')
  renderReturnBookPage(@Req() request) {
    const { message } = request.query;
    return { message };
  }
}
