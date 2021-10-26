import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Author } from 'src/app/authors/Author.model';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../Book.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm!: FormGroup
  authors: Author[] = [];
  selectedValue!: string;

  constructor(
    private fb: FormBuilder,
    private service: BookService,
    private authorService: AuthorService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required]],
      chapters: [null, [Validators.required]],
      pages: [null, [Validators.required]],
      isbn: ['', [Validators.required]],
      publisherName: ['', [Validators.required]],
      author: [null, [Validators.required]]
    })

    this.getAllAuthors();
  }

  getAllAuthors() {
    this.authorService.getall()
      .subscribe(res => {
        this.authors = res
      })
  }

  submit() {
    const formValues = this.bookForm.value;
    delete (formValues.author.id)
    let book: Book = new Book(
      formValues.name,
      formValues.chapters,
      formValues.pages,
      formValues.isbn,
      formValues.publisherName,
      formValues.author
    )
    this.service.save(book)
      .subscribe(res => {
        this.bookForm.reset();
        this.message('Livro criado com sucesso!', 'Sucesso')
        this.router.navigateByUrl('/books');
      }, (err) => {
        [
          this.message('Erro ao salvar o livro. Erro: ' + err, 'Erro')
        ]
      })
  }

  message(mesage: string, title: string) {
    this.snack.open(mesage, title, {
      duration: 3000
    })
  }

}
