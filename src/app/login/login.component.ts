import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  Formlogin!: FormGroup;
  constructor( private fb : FormBuilder ,private authService : AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.Formlogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  handleLogin() {
    let username = this.Formlogin.value.username;
    let password = this.Formlogin.value.password;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.router.navigateByUrl("/admin");
      },
      error: (err) => {
        console.error("Login failed", err);
        // Handle login failure here
      }
    });
  }

  handleRegister() {
    console.log("Register button clicked");
  }

}
