import { Injectable } from '@angular/core';
import {ICarEntity, ICarOwnersService, IOwnerEntity} from "../interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements ICarOwnersService{
  private usersApi = "/api/users/";

  constructor(private http: HttpClient) { }

  createOwner(user: IOwnerEntity): Observable<IOwnerEntity> {
    return this.http.post<IOwnerEntity>(this.usersApi, user);
  }

  deleteOwner(aOwnerId: number): Observable<IOwnerEntity[]> {
    return this.http.delete<IOwnerEntity[]>(this.usersApi+aOwnerId);
  }

  editOwner(aOwner: IOwnerEntity): Observable<IOwnerEntity> {
    return this.http.put<IOwnerEntity>(this.usersApi, aOwner);
  }

  getOwnerById(aId: number): Observable<IOwnerEntity> {
    return this.http.get<IOwnerEntity>(this.usersApi+aId);
  }

  getOwners(): Observable<IOwnerEntity[]> {
    return this.http.get<IOwnerEntity[]>(this.usersApi);
  }
}
