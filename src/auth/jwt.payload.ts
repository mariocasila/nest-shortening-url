export interface JwtPayload {
    username: string;
    sub: number; // `sub` refers to the user ID in JWT payload
  }