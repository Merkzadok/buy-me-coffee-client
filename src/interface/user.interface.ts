export interface Donor {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
  profileId: number | null;
  updatedAt: string;
}

export interface ReceivedDonation {
  id: number;
  amount: number;
  specialMessage: string | null;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
  donor: Donor;
}

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
  profileId: number | null;
  updatedAt: string;
  profile: any | null; // Replace `any` with a real type if you know it
  bankCard: any | null; // Replace `any` with a real type if you know it
  receivedDonations: ReceivedDonation[];
}

export interface CurrentUserResponse {
  user: User;
}
