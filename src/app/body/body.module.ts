import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    BodyComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    ContactComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BodyRoutingModule
  ]
})
export class BodyModule { }
