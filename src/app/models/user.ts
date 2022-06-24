export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  data?: UserData;
}

interface UserData {
  lastLogin: number;
}

export interface Guest extends User {
  uid: '0000000000000000000000000000';
  displayName: 'Guest';
  photoURL: 'https://via.placeholder.com/96/49566B/FFFFFF?text=Guest';
}
