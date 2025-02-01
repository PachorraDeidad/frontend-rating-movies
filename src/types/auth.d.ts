export interface PublicUser{
  publicData: PublicUser | Errors | PromiseLike<PublicUser | Errors>
  id: string
  username: string
  email:string
  name: string
  profile_pic_url: string
}

export type SignUpUser = {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface ConfirmCodeSignUpUser extends SignUpUser {
  otpCode: string
}


export type LogIn = { 
  emailOrUsername: string
  password: string 
}

export type ErrorsLogIn<T> = Partial<T>


export type LogInWithEmail = LogIn<{ email: string }>
export type LogInWithUsername = LogIn<{ username: string }>



export type Errors = Partial<SignUpUser & LogIn> & {
  otpCode?:string
  general?: string;
}
