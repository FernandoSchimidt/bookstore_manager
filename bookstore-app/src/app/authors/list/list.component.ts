import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from '../Author.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  authors: Author[] = [];
  colunas = ['id', 'name', 'age']


  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20]


  constructor(private service: AuthorService) { }

  ngOnInit(): void {
    this.listAuthors(this.pagina, this.tamanho);
  }
  listAuthors(page = 0, size = 10) {
    this.service.pageAuthor(page, size)
      .subscribe(res => {
        this.authors = res.content;
        this.totalElementos = res.totalElements;
        this.pagina = res.number;
      })
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.listAuthors(this.pagina, this.tamanho)
  }

}
