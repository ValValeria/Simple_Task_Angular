import {Component, OnInit, ViewChild} from '@angular/core';
import {CarOwnersService} from "../../services/car-owners.service";
import {IOwnerEntity} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public owners: IOwnerEntity[];
  public displayedColumns: string[];
  public ids: number[];
  public isDeleted = false;
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(private carOwnersService: CarOwnersService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.owners = [];
    this.displayedColumns = [];
    this.ids = [];
  }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe(v => {
       v.sort((a, b) => a.id - b.id);
       this.owners = v;
       this.displayedColumns = ['id', 'name', 'surname', 'patronymic', 'cars'];
    })
  }

  check(id: number): void{
    this.ids.push(id);
  }

  delete(){
    this.ids.forEach(v => {
      this.carOwnersService.deleteOwner(v);

      const elem = this.owners.find(v1 => v1.id === v);

      if(elem){
        this.owners.splice(this.owners.indexOf(elem), 1);
      }
    })

    this.isDeleted = true;
    this.table?.renderRows();
  }

  async view(){
    if(this.ids.length === 1){
      await this.router.navigateByUrl(`/user/${this.ids[0]}`);
    } else {
      this._snackBar.open('Please, choose only one user', 'Close');
    }
  }

  async addNewUser(){
    await this.router.navigateByUrl(`/user/0`);
  }
}
