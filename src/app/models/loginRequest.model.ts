import { User } from './user.model';
export class LoginRequest {
  message: string;
  user: User;
  token: string;
}
