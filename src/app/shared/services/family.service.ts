import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor() { }

  // services/family.service.ts
getFamilies() {
  return this.http.get(`${this.baseUrl}/families.json`);
}

addFamily(data: any) {
  return this.http.post(`${this.baseUrl}/families.json`, data);
}
}
