import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IEnquiry {
  personName: string;
  personEmail: string;
  personPhoneNumber?: string;
  enquiryDescription: string;
  relatedProductId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addEnquiry(enquiry: IEnquiry): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });

    return this.http.post(`${this.apiUrl}/enquiry`, enquiry, { headers });
  }
}
