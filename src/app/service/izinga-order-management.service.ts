import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {StoreProfile, Order, UserProfile, Promotion, Profile} from '../model/models'
import { StorageService } from './storage-service.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IzingaOrderManagementService {


  constructor(private http: HttpClient, private storage: StorageService) { }

  get headers(){ 
    return {
    "Content-type": "application/json",
    "app-version": environment.appVersion,
    };
  }
  
  getStoreById(id : string): Observable<StoreProfile> {
    return this.http.get<StoreProfile>(`${environment.izingaUrl}/store/${id}`, {headers: this.headers});
  }

  getAllStores(lat: number, long: number, range: number): Observable<Array<StoreProfile>> {
    return this.http.get<Array<StoreProfile>>(`${environment.izingaUrl}/store?storeType=FOOD&range=${range}&latitude=${lat}&longitude=${long}&size=20`);
  }

  startOrder(order: Order) : Observable<Order> {
    return this.http
        .post<Order>(`${environment.izingaUrl}/order`, order, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          })
        )
  }

  finishOrder(order: Order) : Observable<Order> {
    return this.http
        .patch<Order>(`${environment.izingaUrl}order/${order.id}`, order, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllOrdersByMobileNumber(mobileNumber: string) : Observable<Array<Order>> {
    return this.http
        .get<Array<Order>>(`${environment.izingaUrl}/order?phone=${mobileNumber}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllOrdersByCustomer(id: string) : Observable<Array<Order>> {
    return this.http
        .get<Array<Order>>(`${environment.izingaUrl}/order?userId=${id}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllOrdersByStoreId(storeId: string) {
    return this.http
        .get<Array<Order>>(`${environment.izingaUrl}/order?storeId=${storeId}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllPromotionsByStoreId(storeId: string) {
    return this.http
        .get<Array<Promotion>>(`${environment.izingaUrl}/promotion?storeType=${environment.storeType}&storeId=${storeId}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getAllPromotions(lat: number, long: number, range: number) {
    return this.http
        .get<Array<Promotion>>(`${environment.izingaUrl}/promotion?storeType=${environment.storeType}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getOrderById(orderId: string) : Observable<Order> {
    return this.http
    .get<Order>(`${environment.izingaUrl}/order/${orderId}`, {headers: this.headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.storage.errorMessage = error.error.message
        return throwError(error)
      }))
  }

  registerCustomer(userProfile: UserProfile) : Observable<UserProfile> {
    return this.http
        .post<UserProfile>(`${environment.izingaUrl}/user`, userProfile, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getCustomerByPhoneNumber(mobileNumber: string): Observable<UserProfile> {
    return this.http
        .get<UserProfile>(`${environment.izingaUrl}/user/${mobileNumber}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  getCustomerById(customerId: string): Observable<UserProfile> {
    return this.http
        .get<UserProfile>(`${environment.izingaUrl}/user/${customerId}`, {headers: this.headers})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.storage.errorMessage = error.error.message
            return throwError(error)
          }))
  }

  findNearbyMessangers(latitude: number, longitude: number, range: number): Observable<UserProfile[]> {
    return this.http
      .get<UserProfile[]>(`${environment.izingaUrl}/user?latitude=${latitude}&longitude=${longitude}&range=${range}&role=${Profile.RoleEnum.MESSENGER}`, {headers: this.headers})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.storage.errorMessage = error.error.message
          return throwError(error)
        }))
  }
}
