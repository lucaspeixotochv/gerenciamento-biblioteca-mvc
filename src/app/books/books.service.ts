import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.books.findMany();
  }

  async searchBooks(searchTerm: string) {
    const books = await this.prismaService.books.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { author: { contains: searchTerm } },
        ],
      },
    });
    return books;
  }

  async borrowBook(bookId: number) {
    const book = await this.prismaService.books.findUnique({
      where: { id: bookId },
    });

    if (!book.available) {
      return 'Livro não disponível para empréstimo';
    }

    await this.prismaService.borrows.create({
      data: {
        bookId,
        borrowedAt: new Date(),
        returnDueDate: new Date(
          new Date().getTime() + 14 * 24 * 60 * 60 * 1000,
        ),
      },
    });

    await this.prismaService.books.update({
      where: { id: bookId },
      data: { available: false },
    });

    return 'Empréstimo registrado com sucesso';
  }

  async addBook(title: string, author: string) {
    try {
      await this.prismaService.books.create({
        data: {
          title,
          author,
          available: true,
          registrationNumber: randomUUID(),
        },
      });
      return 'Livro adicionado com sucesso';
    } catch (error) {
      return 'Ocorreu um erro ao adicionar o livro';
    }
  }

  async returnBook(bookId: number) {
    try {
      const borrowedBook = await this.prismaService.borrows.findFirst({
        where: {
          bookId,
        },
      });

      if (!borrowedBook) {
        return 'Livro não encontrado ou já devolvido';
      }

      await this.prismaService.borrows.delete({
        where: { id: borrowedBook.id },
      });

      await this.prismaService.books.update({
        where: { id: bookId },
        data: { available: true },
      });

      return 'Livro devolvido com sucesso';
    } catch (error) {
      return 'Ocorreu um erro ao processar a devolução do livro';
    }
  }
}
