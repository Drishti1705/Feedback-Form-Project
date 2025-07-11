import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  private baseUrl = 'http://localhost:5000/api/designations'; // your backend URL

  constructor(private http: HttpClient) {}

  getDesignations(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // designation.service.ts
  addDesignation(des: any) {
  return this.http.post('http://localhost:5000/api/designations', des);
}
  }

