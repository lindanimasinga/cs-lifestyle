import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage-service.service';
import { UkhesheAuthResponse } from '../model/ukheshe-auth-response';
import { UkhesheUser } from '../model/ukheshe-user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class UkhesheService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  login(username: string, password: string) : Observable<UkhesheAuthResponse> {
    var headers = {
      "Content-type": "application/json",
    };

    var auth = {
      "identity" : username,
      "password" : password
    }

    return this.http
        .post<UkhesheAuthResponse>(`${environment.ukhesheUrl}/authentication/login`, auth , {headers: headers})
        .pipe(
          map(auth => {
            this.storage.jwt = auth.headerValue
            return auth
          })
        )
  }

  userInfo(mobileNumber: string): Observable<UkhesheUser> {
    var headers = {
      "Content-type": "application/json",
      "Authorization": this.storage.jwt
    };

    return this.http
    .get<UkhesheUser>(`${environment.ukhesheUrl}/customers?username=${mobileNumber}`, {headers: headers})
    .pipe(
      map(user => {
        this.storage.ukhesheUser = user
        return user
      })
    )
  }

  payForOrder(order: Order) {
  
     var headers = {
        "Content-type": "application/json",
        "Authorization": this.storage.jwt
      };
  
      var request = {
        "fromAccountId": this.storage.ukhesheUser.accountId,
        "toAccountId": environment.mainShopAccount,
        "type": "MANUAL_APP",
        "amount": order.totalAmount,
        "description": order.description,
        "uniqueId": order.id,
        "externalId": order.id,
        "message": `Pay for order ${order.id}`
      };

      return this.http
          .post<PaymentResponse>(`${environment.ukhesheUrl}/transfers`,request,  {headers: headers})
  }
}
