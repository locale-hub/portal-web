import {Observable, of} from 'rxjs';
import {MessageService} from '../services/message.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiError} from '../../data/models/api-error.model';


export default class ServiceHelper {

  private static decoder = new TextDecoder('utf-8');

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param fallbackResult - optional default value to return as the observable result
   */
  static handleError<T>(operation = 'operation', fallbackResult?: T) {
    return (response: HttpErrorResponse): Observable<T> => {
      if (401 === response.status) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (response.error instanceof ProgressEvent) {
        MessageService.instance.log('Something wrong happened, please try again later.');
      } else if (undefined !== response.error) {
        const body: { error: ApiError } = (response.error instanceof ArrayBuffer)
          ? JSON.parse(ServiceHelper.decoder.decode(response.error))
          : response.error;

        MessageService.instance.log(body.error.message);
        console.log(body.error);
      }

      return of(fallbackResult as T);
    };
  }

}


