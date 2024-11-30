import { Gender } from "../gender.model";

export class EditProfileModel {
  name: string = "";
  email: string = "";
  phone: string = "";
  image?: string = "";
  gender: Gender = Gender.Male;
  password: string = "";
  address: string = "";
}
