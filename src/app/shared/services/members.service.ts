import { Injectable } from '@angular/core';
import { config } from '../../config/config.global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SocietyMember } from '../models/member';
import { Observable, map, of, take, switchMap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUrl = config.FirebaseConfig.apiUrl; // 👈 Backend URL
  private memberListCollectionName = config.memberListCollectionName; // 👈 Collection name for members
  private memberListCollectionNameWithJson = config.memberListCollectionNameWithJson; // 👈 Collection name with .json for Firebase

  constructor(private http: HttpClient) { }

  // getFamiliesList() {
  //   return this.http.get(`${this.baseUrl}/families.json`);
  // }

  getMembersList(): Observable<SocietyMember[]> {
    return this.http.get<SocietyMember[]>(`${this.baseUrl}/${this.memberListCollectionNameWithJson}`);
    // return this.http.get<SocietyMember[]>(this.completeURL);
  }


  addMember(data: any) {
    return this.http.post(`${this.baseUrl}/${this.memberListCollectionNameWithJson}`, data);
  }

 addFamily(data: any) {
    return this.http.post(`${this.baseUrl}/${this.memberListCollectionNameWithJson}`, data);
  }
  deleteMemberByFirebaseKey(firebaseKey: string) {
    return this.http.delete(`${this.baseUrl}/${this.memberListCollectionName}/${firebaseKey}.json`);
  }

  deleteMember888(memberId: string): Observable<void> {
    return this.getFirebaseKeyByMemberId(memberId).pipe(
      take(1),
      map(firebaseKey => {
        if (firebaseKey) {
          return firebaseKey;
        } else {
          console.warn('Firebase key not found for memberId:', memberId);
          throw new Error('Firebase key not found');
        }
      }),
      // switch to the delete observable if key found
      switchMap(firebaseKey =>
        this.http.delete<void>(`${this.baseUrl}/${this.memberListCollectionName}/${firebaseKey}.json`)
      ),
      catchError(err => {
        // Optionally handle/log error here
        return of(void 0);
      })
    );
  }

  deleteMemberByMemberId(memberId: string): Observable<void> {
  const queryUrl = `${this.baseUrl}/${this.memberListCollectionName}.json`;

  const params = new HttpParams()
    .set('orderBy', '"memberId"')
    .set('equalTo', `"${memberId}"`);

  return this.http.get<{ [key: string]: any }>(queryUrl, { params }).pipe(
    take(1),
    switchMap(data => {
      const keys = Object.keys(data || {});
      if (keys.length === 0) {
        return throwError(() => new Error(`No member found with memberId ${memberId}`));
      }

      const firebaseKey = keys[0];
      const deleteUrl = `${this.baseUrl}/${this.memberListCollectionName}/${firebaseKey}.json`;
      console.log(`Deleting member with Firebase key: ${firebaseKey}`);
      console.log(`Delete URL: ${deleteUrl}`);
      return this.http.delete<void>(deleteUrl);
    })
  );
}


  //write a method to update the member payment details for the given member id
  updateMemberPaymentDetails(memberId: string, paymentDetails: any) {
    return this.http.put(`${this.baseUrl}/${this.memberListCollectionName}/${memberId}.json`, paymentDetails);
  }

  getPaymentsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payments.json`);
  }

  getFirebaseKeyByMemberId(memberId: string): Observable<string | null> {
    const url = `${this.baseUrl}/${this.memberListCollectionNameWithJson}`;

    const params = new HttpParams()
      .set('orderBy', '"memberId"')
      .set('equalTo', `"${memberId}"`);

    return this.http.get<{ [key: string]: any }>(url, { params }).pipe(
      take(1),
      map(data => {
        const keys = Object.keys(data || {});
        return keys.length > 0 ? keys[0] : null;
      })
    );
  }
}
