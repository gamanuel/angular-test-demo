import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditcardService } from 'src/app/services/creditcard.service';
@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.css']
})
export class CreditCardPaymentComponent implements OnInit {

  cardForm: FormGroup;
  btnConfirmPaymentLoading: boolean;
  statusMessage: string;

  constructor(private readonly fb: FormBuilder, private _creditCardService: CreditcardService) {
    
    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      cardHolder: ['',Validators.required],
      expirationDate: ['',[Validators.required,ValidateDate]],
      securityCode: ['', [Validators.minLength(3), Validators.maxLength(3)]],
      amount: ['',[Validators.required,Validators.min(1)]]
    })
  
  }

  ngOnInit(): void {
  }

  /**
   * Validate form elements status
   * @param name 
   */
  inputIsValid(name: string){
    if(this.cardForm.get(name).valid && (this.cardForm.get(name).dirty || this.cardForm.get(name).touched)){
      return true;
    }
    else if(this.cardForm.get(name).invalid && (this.cardForm.get(name).dirty || this.cardForm.get(name).touched)){
      return false;
    }
    else {
      return null;
    }
  }

  submitCardDetails(){
    if (this.cardForm.valid) {
      this.btnConfirmPaymentLoading = true;
      this._creditCardService.creditCardData(this.cardForm.value).subscribe( resp => {
        this.btnConfirmPaymentLoading = false;
        this.statusMessage = 'Success';
        this.myToast()
      }, err => {
        this.statusMessage = 'Error';
        this.myToast()
        this.btnConfirmPaymentLoading = false;
      });
    } else {
    }
  }

  myToast() {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  
}

/**
 * Validate date > current date
 * @param control 
 */
function ValidateDate(control: AbstractControl): {[key: string]: any} | null  {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  if (new Date(control.value) <  new Date(date)) {
    return { 'dateInvalid': true };
  }
  return null;
}
