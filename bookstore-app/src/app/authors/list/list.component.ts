import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { DialogDelecaoComponent } from 'src/app/shared/dialog-delecao/dialog-delecao.component';
import { Author } from '../Author.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  authors: Author[] = [];
  colunas = ['id', 'name', 'age', 'actions']


  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20]


  constructor(
    private service: AuthorService,
    private dialog: MatDialog
    ,private router:Router
  ) { }

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

  openDialog(id: Author) {
    const dialogRef = this.dialog.open(DialogDelecaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id)
        this.router.navigateByUrl('/authors')
      }
    });
  }


}
