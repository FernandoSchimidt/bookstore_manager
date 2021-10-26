import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../Book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  colunas = ['id', 'name', 'chapters', 'pages', 'isbn', 'publisherName','author']


  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20]


  constructor(
    private service: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.listBooks(this.pagina, this.tamanho);
  }
  listBooks(page = 0, size = 10) {
    this.service.pageBooks(page, size)
      .subscribe(res => {
        console.log(res)
        this.books = res.content;
        this.totalElementos = res.totalElements;
        this.pagina = res.number;
      })
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.listBooks(this.pagina, this.tamanho)
  }
}
