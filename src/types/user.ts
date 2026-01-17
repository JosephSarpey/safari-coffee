export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'COMPANY';
  companyName?: string;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  avatar?: string;
  createdAt: string;
}
