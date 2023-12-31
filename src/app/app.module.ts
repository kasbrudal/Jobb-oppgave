import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentPageComponent } from './pages/department-page/department-page.component';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { DepartmentsService } from './services/departments.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentPageComponent,
    DepartmentsListComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatExpansionModule
  ],
  providers: [
    provideClientHydration(),
    DepartmentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
