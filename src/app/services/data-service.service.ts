import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {IOwnerEntity} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  private readonly users: IOwnerEntity[];

  constructor() {
    this.users = [
      {id: 1, name: "Svetlana", surname: "Oop", patronymic: "Oop2", cars: [{id: 1, date: new Date().getFullYear().toString(), number: `AX1111HP`, manufacturer: "Tesla", model: "SomeModel"}]}
    ];
  }

  createDb() {
    return {
      users: this.users,
    };
  }
}
