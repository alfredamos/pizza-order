import { UserResponseModel } from '../users/userResponse.model';

export class AuthState {
  id: string = "";
  name: string = "";
  role: string = "";
  image: string = "";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: UserResponseModel = new UserResponseModel();
}
