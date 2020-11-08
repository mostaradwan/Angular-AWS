import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentationComponent} from './documentation/documentation.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'documentation',
    component: DocumentationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
