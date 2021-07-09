import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import {DataService} from "./services/data-service.service";
import { HttpClientModule } from '@angular/common/http';
import { SectionLayoutComponent } from './layouts/section-layout/section-layout.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import { InMemoryWebApiModule } from "angular-in-memory-web-api"
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from '@angular/material/dialog';
import { ChangeCarFormComponent } from './components/change-car-form/change-car-form.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'user/:id', component: UserPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserPageComponent,
    SectionLayoutComponent,
    ChangeCarFormComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        InMemoryWebApiModule.forRoot(DataService),
        HttpClientModule,
        RouterModule.forRoot(routes),
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatMenuModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatProgressSpinnerModule
    ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
