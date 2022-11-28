export interface UserDTO {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  provider: string;
  updatedAt: string;
  username: string;
}
