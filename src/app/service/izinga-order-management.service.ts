import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {StoreProfile, Order, UserProfile, Promotion} from '../model/models'
import { StorageService } from './storage-service.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IzingaOrderManagementService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getStoreById(id : string): Observable<StoreProfile> {
    return this.http.get<StoreProfile>(`${environment.izingaUrl}/store/${id}`);
  }

  getAllStores(lat: number, long: number, range: number): Observable<Array<StoreProfile>> {
    return this.http.get<Array<StoreProfile>>(`${environment.izingaUrl}/store?storeType=FOOD&range=${range}&latitude=${lat}&longitude=${long}&size=20`);
  }

  startOrder(order: Order) : Observable<Order> {
    var headers = {
      "Content-type": "application/json",
    };
    return this.http
        .post<Order>(`${environment.izingaUrl}/order`, order, {headers: headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          })
        )
  }

  finishOrder(order: Order) : Observable<Order> {
    var headers = {
      "Content-type": "application/json",
    };
    return this.http
        .patch<Order>(`${environment.izingaUrl}order/${order.id}`, order, {headers: headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllOrdersByMobileNumber(mobileNumber: string) : Observable<Array<Order>> {
    return this.http
        .get<Array<Order>>(`${environment.izingaUrl}/order?phone=${mobileNumber}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllOrdersByStoreId(storeId: string) {
    return this.http
        .get<Array<Order>>(`${environment.izingaUrl}/order?storeId=${storeId}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllPromotionsByStoreId(storeId: string) {
    return this.http
        .get<Array<Promotion>>(`${environment.izingaUrl}/promotion?storeType=${environment.storeType}&storeId=${storeId}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getOrderById(orderId: string) : Observable<Order> {
    return this.http
    .get<Order>(`${environment.izingaUrl}/order/${orderId}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.storage.errorMessage = error.error.message
        return throwError(error)
      }))
  }

  registerCustomer(userProfile: UserProfile) : Observable<UserProfile> {
    var headers = {
      "Content-type": "application/json",
    };
    return this.http
        .post<UserProfile>(`${environment.izingaUrl}/user`, userProfile, {headers: headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getCustomerByPhoneNumber(mobileNumber: string): Observable<UserProfile> {
    return this.http
        .get<UserProfile>(`${environment.izingaUrl}/user/${mobileNumber}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getCustomerById(customerId: string): Observable<UserProfile> {
    return this.http
        .get<UserProfile>(`${environment.izingaUrl}/user/${customerId}`)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }
}
