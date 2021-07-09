import {Observable} from "rxjs";

export interface IOwnerEntity {
  name: string,
  surname: string,
  id: number,
  patronymic: string,
  cars: ICarEntity[]
}

export interface ICarEntity {
  id: number,
  number: string,
  manufacturer: string,
  model: string,
  date: string,
}

export interface ICarOwnersService {
  getOwners(): Observable<IOwnerEntity[]>;
  getOwnerById(aId: number): Observable<IOwnerEntity>;
  createOwner(
    user: IOwnerEntity
  ): Observable<IOwnerEntity>;
  editOwner(aOwner: IOwnerEntity): Observable<IOwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<IOwnerEntity[]>;
}
