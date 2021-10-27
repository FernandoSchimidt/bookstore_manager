import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from './User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginError: boolean = false;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      login: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {

    let formValues = this.registerForm.value;
    let user: User = new User(formValues.login, formValues.name, formValues.password);
    this.service.save(user)
      .subscribe(res => {
        this.registerForm.reset();
        this.router.navigateByUrl('/login');
        this.message('Usuario ' + res.name + 'cadastrado com sucesso!', 'Sucesso')
      }, (err) => {
        this.message('Erro ao cadastrar o usuario. Error: ' + err, 'Error')
      })

  }

  message(mesage: string, title: string) {
    this.snack.open(mesage, title, {
      duration: 3000
    })
  }

}
