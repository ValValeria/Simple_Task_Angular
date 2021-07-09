import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ICarEntity, IOwnerEntity} from "../../interfaces";
import {Subject} from "rxjs";
import {CarOwnersService} from "../../services/car-owners.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export const SUBMIT$ = new Subject<ICarEntity>();

@Component({
  selector: 'app-change-car-form',
  templateUrl: './change-car-form.component.html',
  styleUrls: ['./change-car-form.component.scss']
})
export class ChangeCarFormComponent implements OnInit {
  formGroup: any;
  users: IOwnerEntity[] = [];

  constructor(private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ICarEntity,
              private service: CarOwnersService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
              ) {
    this.service.getOwners().subscribe(v => {
        this.users = v;
    });
  }

  ngOnInit(): void {
    this.formGroup = this.builder.group({
       'number': this.builder.control(this.data.number, [
         Validators.pattern(/^[A-Z]{2}\d{4}[A-Z]{2}$/),
         Validators.required
       ]),
       'model': this.builder.control(this.data.model, [
         Validators.required
       ]),
       'date': this.builder.control(this.data.date, [
         Validators.required
       ]),
       'manufacturer': this.builder.control(this.data.manufacturer, [
         Validators.required
       ]),
    });
  }

  submit($event: Event) {
    $event.preventDefault();

    this.formGroup.markAllAsTouched();

    if(this.formGroup.valid){
      const isUnique = this.users.every(v => !v.cars.find(v1 => v1.number === this.formGroup.get('number').value));

      if (!isUnique) {
        this.snackBar.open('The number of the car is not unique', 'Close');
      } else{
        SUBMIT$.next({...this.formGroup.value, id: this.data.id});
        this.dialog.closeAll();
      }
    } else {
      this.snackBar.open('Check the validity of fields', 'Close');
    }
  }

  close($event: Event): void{
    $event.preventDefault();
    this.dialog.closeAll();
  }
}
