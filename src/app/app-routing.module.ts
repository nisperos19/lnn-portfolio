import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/body', pathMatch: 'full' }, //Create and path it to landing page if available
  {
    path: 'body',
    loadChildren: () =>
      import('./../app/body/body.module').then((m) => m.BodyModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
