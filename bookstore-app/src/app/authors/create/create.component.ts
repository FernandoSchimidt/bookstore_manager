import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from '../Author.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  authorForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private service: AuthorService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required]],
      age: [null, [Validators.required]]
    })
  }

  submit() {
    const formValues = this.authorForm.value;
    let author: Author = new Author(formValues.name, formValues.age);
    this.service.save(author)
      .subscribe(res => {
        this.authorForm.reset();
        this.message('Author :' + res.name + ' salvo com sucesso!', 'Salvo');
        this.router.navigateByUrl('/authors')
      }, (err) => {
        this.message('Erro ao cadastrar o autor. Erro: ' + err, 'Erro')
      })
  }

  message(mesage: string, title: string) {
    this.snack.open(mesage, title, {
      duration: 3000
    })
  }

}
