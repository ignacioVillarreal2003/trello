import { Injectable } from '@angular/core';
import {IUser} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  email: string = "";
  username: string = "";
  teamName: string = "";
  boardId: number = 0;
}
