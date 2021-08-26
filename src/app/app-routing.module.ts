import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';

import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
