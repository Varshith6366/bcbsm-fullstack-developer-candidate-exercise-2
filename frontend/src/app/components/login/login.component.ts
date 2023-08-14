import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/UserService';
import { UserLogin } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLoginForm: any = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

  login() {
    this.userLoginForm.markAllAsTouched();
    if (this.userLoginForm.valid) {
      const user: UserLogin = this.userLoginForm.value as UserLogin;
      this.userService.login(user).subscribe(
        (data: any) => { localStorage.setItem("username", data.username); window.location.href = "/profile"; },
        (err) => { console.error(err); }
      )
    }
  }
}
