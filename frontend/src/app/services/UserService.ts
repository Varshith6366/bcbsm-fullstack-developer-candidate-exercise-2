import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserUpdate } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private API_URL = 'http://localhost:8080/api/user/';

    constructor(private http: HttpClient) {}

    login(user: UserLogin) {
        return this.http.post(this.API_URL + "login", user);
    }

    signup(user: UserLogin) {
        return this.http.post(this.API_URL + "save", user);
    }

    getUserProfile(username: string) {
        return this.http.post(this.API_URL + "profile", {"username": username});
    }

    updateUserProfile(userData: UserUpdate) {
        return this.http.put(this.API_URL + "update", userData);
    }
}