export interface SocietyMember {
  memberId: string; // Unique identifier for the member
  name: string;
  apartmentNumber: string;
  email: string;
  phone: string;
  
}
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