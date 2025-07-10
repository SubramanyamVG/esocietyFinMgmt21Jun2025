import { Injectable } from '@angular/core';
import { config } from '../global/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SocietyMember } from '../models/member';
import { Observable, map, take, switchMap, catchError, throwError, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersSubject = new BehaviorSubject<SocietyMember[]>([]);
  members$ = this.membersSubject.asObservable(); // Expose as observable

  private baseUrl = config.FirebaseConfig.apiUrl; // 👈 Backend URL
  private memberListCollectionName = config.memberListCollectionName; // 👈 Collection name for members
  private memberListCollectionNameWithJson = config.memberListCollectionNameWithJson; // 👈 Collection name with .json for Firebase

  constructor(private http: HttpClient) { }
  // Method to get the complete URL for the member list collection
  get completeURLwithJson(): string {
    return `${this.baseUrl}/${this.memberListCollectionNameWithJson}`;
  }

  get completeURLwithoutJson(): string {
    return `${this.baseUrl}/${this.memberListCollectionName}`;
  }

  getMembersList_old(): Observable<SocietyMember[]> {
    return this.http.get<SocietyMember[]>(this.completeURLwithJson);
  }

  //to fetch members and update the BehaviorSubject
  getMembersList(): Observable<SocietyMember[]> {
    return this.http.get<SocietyMember[]>(this.completeURLwithJson).pipe(
      tap(members => this.membersSubject.next(members))
    );
  }
  // method to add new member to firebase
  addMember(data: any) {
    return this.http.post(this.completeURLwithJson, data).pipe(
      tap(() => this.getMembersList().subscribe())
    );
  }

  updateMember(memberId: string, data: any) {
    return this.http.patch(`${this.completeURLwithoutJson}/${memberId}.json`, data);
  }

  deleteMemberByFirebaseKey(firebaseKey: string) {
    return this.http.delete(`${this.completeURLwithoutJson}/${firebaseKey}.json`);
  }


  deleteMemberByMemberId(memberId: string): Observable<void> {
    const queryUrl = this.completeURLwithJson;

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
        const deleteUrl = `${this.completeURLwithoutJson}/${firebaseKey}.json`;
        console.log(`Deleting member with Firebase key: ${firebaseKey}`);
        console.log(`Delete URL: ${deleteUrl}`);
        return this.http.delete<void>(deleteUrl);
      })
    );
  }


  //write a method to update the member payment details for the given member id
  updateMemberPaymentDetails(memberId: string, paymentDetails: any) {
    return this.http.put(`${this.completeURLwithoutJson}/${memberId}.json`, paymentDetails);
  }

  getPaymentsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payments.json`);
  }

  getFirebaseKeyByMemberId1(memberId: string): Observable<string | null> {

    const params = new HttpParams()
      .set('orderBy', '"memberId"')
      .set('equalTo', `"${memberId}"`);

    return this.http.get<{ [key: string]: any }>(this.completeURLwithJson, { params }).pipe(
      take(1),
      map(data => {
        const keys = Object.keys(data || {});
        return keys.length > 0 ? keys[0] : null;
      })
    );
  }

  updateMemberPaymentDetailsByFirebaseKey(firebaseKey: string, paymentDetails: any): Observable<any> {
    const url = `${this.completeURLwithoutJson}/${firebaseKey}.json`;
    return this.http.patch(url, { paymentDetails }).pipe(
      catchError(error => {
        console.error('Error updating payment details:', error);
        return throwError(() => new Error('Failed to update payment details'));
      })
    );
  }
}
