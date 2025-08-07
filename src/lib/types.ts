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
// {
//     "id": 19,
//     "name": "Stromi blogger",
//     "about": "I’m Stromi-Blogger, a passionate storyteller and thinker exploring ideas through writing.\n✍️ Writing is my way to connect, reflect, and grow.\n🌱 Constantly learning, always evolving.\n🚀 Join me on this journey of discovery and creativity.",
//     "avatarImage": "https://res.cloudinary.com/duw6cdsyv/image/upload/v1754387357/tjgpaqbfcf6xqenbjdkw.jpg",
//     "socialMediaURL": "https://stromi-blogger.com",
//     "backgroundImage": null,
//     "successMessage": null,
//     "userId": 20,
//     "createdAt": "2025-08-05T09:50:40.414Z",
//     "updatedAt": "2025-08-05T09:50:40.414Z",
//     "user": {
//         "username": "Stormi"
//     }
// }

// export type DonationUserDataType = {
//   userProfile: ProfileType;
//   username: string;
// };

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
};
