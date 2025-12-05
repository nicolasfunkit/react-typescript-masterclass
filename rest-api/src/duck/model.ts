export interface Duck {
  id: string;
  username: string;
  password: string;
}

export const DuckKeys = {
  TableName: "duck",
  ColId: "id",
  ColUsername: "username",
  ColPassword: "password",
} as const;
