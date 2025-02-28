import { Gender } from "../gender.model";
import { Role } from "../role.model";

export class UserPayload{
 id: string = '';
  name: string = "";
  email: string = "";
  phone: string = "";
  image: string = "";
  role: Role = Role.User;
  gender: Gender = Gender.Male;
  address: string = "";;
}
