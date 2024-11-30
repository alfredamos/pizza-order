import { UserResponseModel } from "./userResponse.model";

export class AuthState {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  user: UserResponseModel = new UserResponseModel();
  token: string | null = null;
}
