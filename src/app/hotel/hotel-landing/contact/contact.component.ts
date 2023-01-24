import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CountriesService } from 'src/app/countries.service';

import { ErrorHandlerService, OpenConfirmDialog } from 'src/app/error-handler.service';
import { GeneralConfirmComponent } from 'src/app/my-dialogs/dialogs/general-confirm/general-confirm.component';
import { SubSink } from 'subsink';
import { HomeService } from '../../home.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy, AfterViewInit, OpenConfirmDialog {
  subs = new SubSink()
  countries: any;
  selectedCountry: any;

  constructor(private _countriesService: CountriesService, 
    private _homeService: HomeService,
    private _errorHandler:ErrorHandlerService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object) { }
  ngAfterViewInit(): void {

  }

  openDialog(success:boolean, context: any){
    this.dialog.open(GeneralConfirmComponent,
      {data: this._errorHandler.getDialogContext(success, context)});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {

    this.getCountries();

  }

  onSubmit(f: NgForm){
    let countryCode = ''
    const context = this._errorHandler.getDialogDataWithDefaultIcon('Operation succeeded', 'Operation failed', 
    'Contact message sent successfully.', 
    'We faield to send your contact message. Please try again.'
    )

    if(isPlatformBrowser(this.platformId)){
      const span = document.getElementById('countryCode');
      if(span){
        countryCode = span.innerText
      }
    }

    const data = f.value

    data['country_code'] = countryCode

    this.subs.add(
      this._homeService.sendContactMessage(data).subscribe(
        {
          next: res=>{
            this.openDialog(true, context);
            f.resetForm()
            this.selectedCountry = '';
          },
          error: (err: HttpErrorResponse)=>{
            const detail = this._errorHandler.getErrorMessage(err)
            context.errorMessage = detail
            this.openDialog(false, context);
          }
        }

      )
    )
  }

  getCountries(){
    this.subs.add(
      this._countriesService.getCountries('all').subscribe(
        res=> {
          if(res){
            this.countries = (res as Array<any>).sort((a,b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
          }
          
          //console.log(this.countries)
        }
      )
    )
  }

  onSelectionChange(e: any){
    const country = e.value;

    if(!country) return;

    const index = this.countries.findIndex((c: any) => c.name.common === country)

    if(index !== -1){
      this.selectedCountry = this.countries[index]
    }


  }

}
