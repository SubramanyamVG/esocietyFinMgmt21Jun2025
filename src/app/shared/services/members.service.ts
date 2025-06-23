import { Injectable } from '@angular/core';
import { config } from '../../config/config.global';
import { HttpClient } from '@angular/common/http';
import { SocietyMember } from '../models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUrl = config.FirebaseConfig.apiUrl; // 👈 Backend URL
  private memberListCollectionName = config.memberListCollectionName; // 👈 Collection name for members
  private memberListCollectionNameWithJson = config.memberListCollectionNameWithJson; // 👈 Collection name with .json for Firebase
  private completeURL = "https://sgesociety-3f2c9-default-rtdb.firebaseio.com/societyMembers.json" // 👈 Collection name with .json for Firebase

  constructor(private http: HttpClient) { }

  // getFamiliesList() {
  //   return this.http.get(`${this.baseUrl}/families.json`);
  // }

  getMembersList(): Observable<SocietyMember[]> {
    return this.http.get<SocietyMember[]>(`${this.baseUrl}/${this.memberListCollectionNameWithJson}`);
    // return this.http.get<SocietyMember[]>(this.completeURL);
  }


  addFamily(data: any) {
    return this.http.post(`${this.baseUrl}/${this.memberListCollectionNameWithJson}`, data);
  }

  deleteFamily(id: string) {
    return this.http.delete(`${this.baseUrl}/${this.memberListCollectionName}/${id}.json`);
  }

  //write a method to update the member payment details for the given member id
  updateMemberPaymentDetails(memberId: string, paymentDetails: any) {
    return this.http.put(`${this.baseUrl}/${this.memberListCollectionName}/${memberId}.json`, paymentDetails);
  }

  getPaymentsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payments.json`);
  }
}
