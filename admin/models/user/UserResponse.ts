interface ConnectedAccount {
  provider: 'google' | 'github' | 'facebook' | 'okta' ;
  connectedAt: string;
}

export enum Role {
  OWNER = "OWNER",
  USER = "USER",
  ADMIN = "ADMIN"
}