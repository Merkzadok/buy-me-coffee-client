export type DonationItemType = {
  amount: number;
  specialMesssage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
};

export type ProfileType = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  backgroundImage: string;
  socialMediaURL: string;
  successMessage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

type UserName = {
  username: string;
};

export type ProfileWithUserNameType = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  backgroundImage: string;
  socialMediaURL: string;
  successMessage: string;
  userId: number;
  user: UserName;
  createdAt: string;
  updatedAt: string;
};

export type CreateProfileType = {
  profileImage: string;
  name: string;
  about: string;
  socialURL: string;
};
export type CreateProfileAPIType = {
  socialMediaURL: string;
  name: string;
  about: string;
  avatarImage: string;
};

export type DonationUserUIType = {
  isEditable: boolean;
  userData: ProfileType;
};

export type UserType = {
  id: number;
  email: string;
  username: string;
  password: string;
  profileId: number;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
};
