import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserLogin } from 'src/app/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  


  registrationForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) {

    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]], // alphanumeric, no special characters
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9\d@$!%?&#]+$')]], // at least 1 special char, 1 uppercase, 1 number
      dob: ['', [Validators.required]], // MM-DD-YYYY format
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required], // Ideally, this should be a dropdown with a predefined list of states
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] // 5 digit number
    });


  }

  ngOnInit(): void {
   
  }

  signup(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      let [month, date, year] = user.dob.split("-");
      user.dob = `${year}-${month}-${date}`;
      this.http.post('http://localhost:8080/api/user/save', user)
        .subscribe(
          () => { alert('Registration successful!'); window.location.href = "/login"; },
          () => alert('Error during registration. Please try again later.')
        );
    } else {
      alert('Please fill out all form fields correctly.');
    }
  }
}