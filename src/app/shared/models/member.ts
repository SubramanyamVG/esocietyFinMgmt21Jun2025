export interface SocietyMember {
  memberId: string; // Unique identifier for the member
  name: string;
  apartmentNumber: string;
  email: string;
  phone: string;
  paymentDetails?: PaymentDetails[];
}

export interface PaymentDetails {
  month: string;
  amount: number;
  fine?: number;
  date?: string;
  mode?: string;
  status?: string;
}

//write a member interface to include the following properties:
// - id: string 
// - name: string
// - apartmentNumber: string
// - email: string
// - phone: string
// paymentDetails?: {
//   month: string;
//   amount: number;
//   fine?: number;
//   date?: string;
//   mode?: string;
//   status?: string;
// };
// - familyMembersCount: number
// - isActive: boolean (indicates if the member is active)  
// - createdAt: Date (timestamp of when the member was created)

export interface Member {
  id: string;
  name: string;
  apartmentNumber: string;
  email: string;
  phone: string;
  familyMembersCount: number;
  isActive: boolean; // Indicates if the member is active
  createdAt: Date; // Timestamp of when the member was created
  updatedAt: Date; // Timestamp of when the member was last updated
}
// export interface Member {
//   id: string;
//   name: string;
//   apartmentNumber: string;
//   email: string;
//   phone: string;
//   familyMembersCount: number;
//   isActive: boolean; // Indicates if the member is active
//   createdAt: Date; // Timestamp of when the member was created
//   updatedAt: Date; // Timestamp of when the member was last updated
// }