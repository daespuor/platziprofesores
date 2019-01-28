import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import {apiUrl} from '../environment';
import { SocialMedia } from './socialMedia.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()

export class SocialMediaService{

    api:string;

    constructor(private http:HttpClient){
        this.api=`${apiUrl}/socialMedias`;
    }

    addSocialMedia(socialMedia:SocialMedia):Observable<HttpResponse<Object>>{
        var headers= new HttpHeaders({
            'content-type':'application/json'
        });
        return this.http.post<HttpResponse<Object>>(`${this.api}`,socialMedia,{headers,observe:'response'})
        .pipe(
            catchError(this.handleFailure)
        )
    }

    addPicture(idSocialMedia:string,file:File):Observable<Object>{
        /*var headers= new HttpHeaders({
            'content-type':'multipart/form-data'
        });*/
        var formData = new FormData();
        formData.append('id_social_media',idSocialMedia);
        formData.append('file',file,'form-data');
        return this.http.post(`${this.api}/picture`,formData,{responseType:'text'}).pipe(
                    catchError(this.handleFailure)
                );
    }

    getSocialMedias():Observable<SocialMedia[]>{
        return this.http.get<SocialMedia[]>(`${this.api}`)
        .pipe(
            catchError(this.handleFailure)
        );
    }

    private handleFailure(error:HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          return throwError(
            error.error.message);
    }

}