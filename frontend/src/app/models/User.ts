export interface User {
  firstName: string;
  lastName: string;
  dob: Date;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  username: string;
  password: string;

  // Constructor to initialize the User model
  // constructor(
  //   firstName?: string,
  //   lastName?: string,
  //   dob?: Date,
  //   streetAddress?: string,
  //   city?: string,
  //   state?: string,
  //   zipCode?: number,
  //   username?: string,
  //   password?: string
  // ) {
  //   this.firstName = firstName || '';
  //   this.lastName = lastName || '';
  //   this.dob = dob || new Date();
  //   this.streetAddress = streetAddress || '';
  //   this.city = city || '';
  //   this.state = state || '';
  //   this.zipCode = zipCode || 0;
  //   this.username = username || '';
  //   this.password = password || '';
  // }
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserUpdate {
  username: string,
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}