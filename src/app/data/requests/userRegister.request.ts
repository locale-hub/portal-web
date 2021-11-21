
export interface UserRegisterRequest {
  user: {
    name: string,
    primaryEmail: string,
    password: string
  };
}
