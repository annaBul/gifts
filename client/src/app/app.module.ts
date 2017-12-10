import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import {DropdownModule} from "ng2-dropdown";
import {TabsModule} from "ng2-tabs";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { DatePickerModule } from 'ng2-datepicker';
import { CKEditorModule } from 'ng2-ckeditor';
import {PopupModule} from 'ng2-opd-popup';

import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {PeopleService} from './services/people.service';
import {ProjectService} from './services/project.service';
import {ProjectsService} from './services/projects.service';
import {AdminService} from './services/admin.service';
import {GiftsService} from './services/gifts.service';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { AdminComponent } from './components/admin/admin.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsGuard }   from './components/settings/settings.guard';
import { CreateProjectGuard }   from './components/create-project/create-project.guard';
import { AdminGuard }   from './components/admin/admin.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { GiftCardComponent }   from './components/gift-card/gift-card.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { PersonPageComponent } from './components/person-page/person-page.component';
import { AddPersonModalComponent } from './components/add-person-modal/add-person-modal.component';
import { GiftPageComponent } from './components/gift-page/gift-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

const appRoutes: Routes =[
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'person/:id', component: PersonPageComponent, pathMatch:'full'},
  { path: 'gift/:name', component: GiftPageComponent, pathMatch:'full'},
  { path: 'create_project', component: CreateProjectComponent, canActivate: [CreateProjectGuard], pathMatch:'full'},
  { path: 'user/:id', component: UserComponent, pathMatch:'full'},
  { path: 'user/:id/settings', component: SettingsComponent, canActivate: [SettingsGuard], pathMatch:'full'},
  { path: 'project/:title', component: ProjectComponent, pathMatch:'full'},
  { path: 'payment', component: PaymentComponent, pathMatch:'full'},
  { path: 'admin/users', component: AdminComponent, canActivate: [AdminGuard], pathMatch:'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    RegistrationComponent,
    NavbarComponent,
    CardComponent,
    FooterComponent,
    SliderComponent,
    LoginComponent,
    MainPageComponent,
    CreateProjectComponent,
    UserComponent,
    ProjectComponent,
    AdminComponent,
    SettingsComponent,
    NotFoundComponent,
    PaymentComponent,
    GiftCardComponent,
    PersonPageComponent,
    GiftPageComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    DropdownModule,
    TabsModule,
    DatePickerModule,
    CKEditorModule,
    PopupModule.forRoot()
  ],
  providers: [
    LoginService,
    UserService,
    PeopleService,
    ProjectService,
    ProjectsService,
    AdminService,
    GiftsService,
    SettingsGuard,
    CreateProjectGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  
}
