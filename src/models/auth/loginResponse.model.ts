import { UserResponseModel } from "../users/userResponse.model";
import { ResponseAuth } from "./ResponseAuth.model";

export class LoginResponse{
  authResponse: ResponseAuth = new ResponseAuth();
  currentUser: UserResponseModel = new UserResponseModel();
}
