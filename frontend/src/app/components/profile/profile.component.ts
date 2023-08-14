import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/UserService';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  profileForm: FormGroup | any = this.fb.group({
    username: [{ value: "", disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]], // alphanumeric, no special characters
    dob: [{ value: "", disabled: true }, [Validators.required]], // MM-DD-YYYY format
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required], // Ideally, this should be a dropdown with a predefined list of states
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] // 5 digit number
  });

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loadUserProfileData();
  }

  loadUserProfileData() {
    const username = localStorage.getItem("username") ?? "";
    this.userService.getUserProfile(username).subscribe(
      (data: any) => {
        this.user = data;
        this.profileForm.setValue({
          username: data.username,
          dob: new Date(data.dob).toISOString().split("T")[0],
          firstName: data.firstName,
          lastName: data.lastName,
          streetAddress: data.streetAddress,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        })
      }
    );
  }

  updateProfile() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      formValue.username = this.user.username;
      this.userService.updateUserProfile(formValue).subscribe(
        (data) => { alert("User profile updated successfully."); this.loadUserProfileData() }
      )
    }
  }

}
