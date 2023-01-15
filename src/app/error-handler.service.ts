import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


export declare interface OpenConfirmDialog{
  openDialog(success:boolean, context: any): void
}


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private _successIcon = 'check_circle'
  private _failureIcon ='warning'

  constructor() { }

  get successIcon() {
    return this._successIcon
  }

  get failureIcon() {
    return this._failureIcon
  }

  getIcons(){
    return {successIcon: this.successIcon,
      failureIcon: this.failureIcon
    }
  }

  setSuccessIcon(icon: string){
    this._successIcon = icon
  }


  setFailiureIcon(icon: string){
    this._failureIcon = icon
  }

  getErrorMessage(error: HttpErrorResponse): string{
    //console.log(error.error)
    if(error.error){
      if(error.error.detail){
        return error.error.detail
      }
      if(error.error.error){
        const er = error.error.error
        if(typeof(er) === 'string'){
          return er
        }

        if(typeof(er) === 'object'){
          try {
            let err = ''
            for(let key of Object.keys(er)){
              err += key + ': ' + er[key] + '\n'
            }
            return err
          } catch (e) {
            return er
          }
         
        }
        
      }

      if(error.error.email){
        let message = ''
        for(let er of error.error.email){
          message += er + '.\n'
        }

        return message
        
      }
      if(error.error.name){
        let message = ''
        for(let er of error.error.name){
          message += er + '.\n'
        }

        return message
      }
    }

    if(error.status){
        const status = error.status
        return `The server has responded with the code: ${status} - ${error.statusText}`
    }

    return "An error occured"
    
  }

  getDialogDataWithNewIcon(successTitle: string, failedTitle: string, successMessage: string, 
                    errorMessage: string,
                    icons: {successIcon: string,
                            failureIcon: string
                          }
                    ){
    return {
      successIcon: icons.successIcon,
      failureIcon: icons.failureIcon,
      titleSuccess: successTitle,
      titleFailure: failedTitle,
      successMessage: successMessage,
      errorMessage: errorMessage,
    }
  }


  getDialogDataWithDefaultIcon(successTitle: string, 
    failedTitle: string, 
    successMessage: string, 
    errorMessage: string
    ){
  return {
  successIcon: this.successIcon,
  failureIcon: this.failureIcon,
  titleSuccess: successTitle,
  titleFailure: failedTitle,
  successMessage: successMessage,
  errorMessage: errorMessage,
  }
}

  getDialogContext(success: boolean, context: any){
    return {
      icon: success? context['successIcon'] : context['failureIcon'],
      title: success? context['titleSuccess'] : context['titleFailure'],
      message: success? context['successMessage']: context['errorMessage'],
      isSuccess: success
    }
  }
}
