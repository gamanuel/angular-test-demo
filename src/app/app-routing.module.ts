import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreditCardPaymentComponent } from './components/credit-card-payment/credit-card-payment.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ 
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'payment',
    component: CreditCardPaymentComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
