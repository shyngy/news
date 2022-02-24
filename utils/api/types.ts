export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  fullName: string;
}

export interface ResponseUser extends Omit<RegisterDto, 'password'> {
  createdAt: string;
  updatedAt: string;
  id: number;
  token: string;
}
