import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../request-util';
// import {Transaction} from '../user.model';

interface IsLoggedIn {
  status: boolean;
}
interface Logout {
  status: boolean;
}

 interface MyData {
    success: boolean;
    message: string;
}
/*interface Userdata {
  success: boolean;
  message: string;
}*/
interface VerifiedData {
  _id: boolean;
  keyid: string;
}
export interface KycData {
   id: number;
  _id: string;
  ip_address: string;
  billing_address_first_name: string;
  billing_address_last_name: string;
  birth_data: string;
  billing_address: string;
  billing_address_country_code: string;
  billing_address_zip_code: string;
  billing_address_city: string;
  billing_address_state: string;
  phone: string;
  email: string;
  scan_data: string;
  document_type: string;
  document_country_code: string;
  user_id: string;
  kyc_state: string;
  s3_detail_id: string;
  created_by: string;
  created_date: string;
  last_modified_by: string;
  last_modified_date: string;
}

export interface PeriodicElement {
  sl: number;
  id: number;
  activated: boolean;
  authorities: Array<VerifiedData>;
  authentication_key: string;
  bsxAddress: string;
  authentication_type: string;
  email: string;
  _id: string;
}
export interface WalletsUser {
  ethereum_address: string;
  nem_address: string;
  btc_address: string;
}
export interface Transactions {
  activated: boolean;
  authentication_key: string;
  timestamp: number;
  email: string;
  blockchain_currency: string;
  transaction_hash: string;
  to: string;
  from: string;
  confirmations: string;
  user_id: string;
  amount: number;
}

@Injectable()
export class AuthService {
  private authenticated = false;
  constructor(private http: HttpClient) {}
      login(username: string, password: string) {
            return this.http.post<MyData>('/api/login', { username, password});
      }

      logout(): Observable<Logout> {
            return this.http.get<Logout>('/api/logout');
      }

      isLoggedIn(): Observable<IsLoggedIn> {
          return this.http.get<IsLoggedIn>('/api/isloggedin');
      }

      getAuthenticated(): boolean {
        return this.authenticated;
      }

      userdata(): Observable<HttpResponse<PeriodicElement[]>> {
        return this.http.get<PeriodicElement[]>( 'api/userdata', {observe: 'response' });
      }

      changeUserData(_id: string, namedata: string, data: any ) {
        return this.http.post<MyData>('/api/changedata', { _id, namedata, data });
      }

      setAuthenticated(auth: boolean) {
        return this.authenticated = auth;
      }

      transactions(): Observable<HttpResponse<Transactions[]>> {
        return this.http.get<Transactions[]>( 'api/transactions', {observe: 'response' });
      }

      getwalletadresses(req?: any): Observable<HttpResponse<WalletsUser>> {
        const options = createRequestOption(req);
        return this.http.get<WalletsUser>( '/api/walletadresses', { params: options, observe: 'response' });
      }

      postwalletadresses(email: string, ethereum_address: string, nem_address: string ) {
        return this.http.post<Logout>( 'api/walletadresses', {email, ethereum_address, nem_address });
      }

      loadImg(): Observable<any> {
          return this.http.get( '/api/s3Proxy', {responseType: 'blob'});
      }

      kycuserdata(): Observable<HttpResponse<KycData[]>> {
        return this.http.get<KycData[]>( 'api/kyc', {observe: 'response' });
      }

     getAmazoneImage(req?: any): Observable<any> {
        const options = createRequestOption(req);
         return this.http.get( '/api/s3Proxy', { params: options, responseType: 'blob'});
      }

     changeKycData(_id: string, kyc_state: string ) {
      return this.http.post<MyData>('/api/changekycstate', { _id, kyc_state});
     }

     declineKycData(_id: string, kyc_state: string ) {
      return this.http.post<MyData>('/api/declinekyc', { _id, kyc_state});
     }
}



