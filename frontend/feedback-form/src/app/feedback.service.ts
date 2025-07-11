import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private apiUrl = 'http://localhost:5000/api/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ✅ New method: send OTP
  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { email });
  }

  // ✅ New method: verify OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp });
  }
}
