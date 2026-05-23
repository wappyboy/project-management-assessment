export type Member = {
  user_id?: string;
  userid?: string;
  userId?: string;
  User_ID?: string;
  email?: string;
  password?: string;
  Password?: string;
};

export type CreateMemberPayload = {
  user_id: string;
  email: string;
  password: string;
};

export type UpdateMemberPayload = {
  user_id: string;
  email?: string;
  password?: string;
};