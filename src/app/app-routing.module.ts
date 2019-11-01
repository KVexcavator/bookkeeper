import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFaundComponent } from './shared/components/not-faund/not-faund.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'system', loadChildren: './system/system.module#SystemModule'},
  { path: '**', component: NotFaundComponent }
]

@NgModule({
  imports:[RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports:[RouterModule]
})

export class AppRoutingModule {

}