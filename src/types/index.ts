// Company 和 Address 在目前需求沒用到，故先用 unknown 代替
type Company = unknown;
type Address = unknown;

export type User = {
  id: number;
  name: string;
  username: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};
