export interface IUser {
    userId: string | null;
    username: string | null;
    avatar_url: string | null;
}

export type AuthContextState = {
    authUser: IUser;
    isLogin: boolean;
    login: (user: IUser) => void;
    logout: () => void;
  };
  