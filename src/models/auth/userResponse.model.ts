import { Role } from "../role.model";

export class UserResponseModel {
  id: string = '';
  name!: string;
  email!: string;
  gender!: string;
  phone!: string;
  role!: Role;
  token?: string;
  image!: string;
}
