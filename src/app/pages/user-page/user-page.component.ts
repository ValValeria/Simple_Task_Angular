import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarOwnersService} from "../../services/car-owners.service";
import {ICarEntity, IOwnerEntity} from "../../interfaces";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ChangeCarFormComponent, SUBMIT$} from "../../components/change-car-form/change-car-form.component";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterViewInit {
  private id = 0;
  public user: IOwnerEntity;
  public tableFields: string[];
  private ids: number[];
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date> | undefined;
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  public formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private carService: CarOwnersService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router
              ) {
    route.paramMap.subscribe(v => {
      this.id = parseInt(v.get("id") || "0", 10);
    });

    SUBMIT$.subscribe(v => {
      this.user.cars = this.user.cars.filter(v1 => v1.id !== v.id);

      this.user.cars.push(v);
      this.user.cars.sort((a, b) => a.id - b.id);
    });

    this.user = {id: 0,
                 surname: "",
                 name: "",
                 cars: [],
                 patronymic: ""};
    this.tableFields = ['id', 'number', 'manufacturer', 'model', 'date'];
    this.ids = [];

    this.formGroup = new FormGroup({
      'name' : new FormControl(this.user.name, [
        Validators.required, Validators.minLength(10), Validators.maxLength(20)
      ]),
      'surname' : new FormControl(this.user.surname, [
        Validators.required, Validators.minLength(10), Validators.maxLength(20)
      ]),
      'patronymic' : new FormControl(this.user.name, [
        Validators.required, Validators.minLength(10), Validators.maxLength(20)
      ]),
    });
  }

  ngOnInit(): void {
    this.carService.getOwnerById(this.id).subscribe(v => {
      if(v && v?.id){
        this.user = v;
      } else {
        this.getNewCar();
      }
    });
  }

  click(): void{
    this.user.cars.sort((a: ICarEntity, b: ICarEntity) => a.id - b.id);

    const container = document.querySelector('.app-container') as HTMLElement;
    const newCar: ICarEntity = this.getNewCar(false);

    container.classList.add('blur');

    this.dialog.open(ChangeCarFormComponent, {
      width: '100%',
      minWidth: "50vw",
      maxWidth: '800px',
      data: newCar
    });

    document.body.style.overflow = 'hidden';

    this.dialog.afterAllClosed.subscribe(v => {
      document.body.style.overflowY = 'auto';
      container.classList.remove('blur');
    });
  }

  ngAfterViewInit(): void {
    if(this.datepicker){
       this.datepicker.select(new Date());
    }

    this.getNewCar();
  }

  async saveChanges(): Promise<any>{
    if(this.formGroup.invalid){
      this._snackBar.open('Please, check the validity of fields (name, surname, etc)', 'Close');
    } else {
      if(!this.user.id){
        const data =  await this.carService.getOwners().toPromise();
        data.sort((a, b) => a.id - b.id);

        this.user.id = data[data.length - 1]?.id;

        if(!this.user.id){
          this.user.id = 1;
        } else {
          this.user.id += 1;
        }

        await this.carService.createOwner(this.user).toPromise();

        this._snackBar.open('The user has been created', 'Close');

      } else {
        await this.carService.editOwner(this.user).toPromise();

        this._snackBar.open('The changes are saved', 'Close');
      }

      await this.router.navigate(['']);
    }
  }

  check($event: MatCheckboxChange,id: number): void{
    if($event.checked){
      this.ids.push(id);
    } else {
      this.ids = this.ids.filter(v => v !== id);
    }
  }

  getNewCar(shouldPush = true): ICarEntity{
    let lastId = (this.user.cars[this.user.cars.length - 1])?.id ;

    if(!lastId){
      lastId = 1;
    } else{
      lastId += 1;
    }

    const obj = {id: lastId, date: new Date().getFullYear().toString(), number: `AX1111HP`, manufacturer: "Tesla", model: "SomeModel"}

    if(shouldPush){
      setTimeout(() => {
        this.user.cars.push(obj);
        this.table?.renderRows();
      });
    }

    return obj;
  }

  changeCar() {
    const container = document.querySelector('.app-container');

    if(this.ids.length === 1 && container){
      container.classList.add('blur');

      this.dialog.open(ChangeCarFormComponent, {
        width: '100%',
        minWidth: "50vw",
        maxWidth: '800px',
        data: this.user.cars.find(v => v.id === this.ids[0])
      });

      document.body.style.overflow = 'hidden';

      this.dialog.afterAllClosed.subscribe(v => {
        document.body.style.overflowY = 'auto';
        container.classList.remove('blur');
      });
    } else {
      this._snackBar.open('Please, choose only one car', 'Close');
    }
  }

  deleteCar() {
    for (const id of this.ids) {
       this.user.cars = this.user.cars.filter(v => v.id !== id);
    }

    this.carService.editOwner(this.user).subscribe(v => {
      this._snackBar.open('The cars have been deleted', 'Close');
    });
  }
}
