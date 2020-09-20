import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {StoreProfile, Order, UserProfile} from '../model/models'
import { StorageService } from './storage-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IzingaOrderManagementService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getStoreById(id : string): Observable<StoreProfile> {
    return this.http.get<StoreProfile>(`${environment.izingaUrl}/store/${id}`);
  }

  startOrder(order: Order) : Observable<Order> {
    var headers = {
      "Content-type": "application/json",
    };
    return this.http
        .post<Order>(`${environment.izingaUrl}/order`, order, {headers: headers})
  }

  finishOrder(order: Order) : Observable<Order> {
    var headers = {
      "Content-type": "application/json",
    };
    return this.http
        .patch<Order>(`${environment.izingaUrl}/order`, order, {headers: headers})
  }

  getAllOrdersByMobileNumber(mobileNumber: string) : Observable<Order> {
    return this.http
        .get<Order>(`${environment.izingaUrl}/order?phone=${mobileNumber}`)
  }

  registerCustomer(userProfile: UserProfile) : Observable<UserProfile> {
    var headers = {
      "Content-type": "application/json",
    };
    return this.http
        .post<UserProfile>(`${environment.izingaUrl}/user`, userProfile, {headers: headers});
  }
}
