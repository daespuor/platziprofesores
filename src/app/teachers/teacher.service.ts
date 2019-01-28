import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Teacher } from './teacher.model';
import {HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse} from '@angular/common/http';
import {apiUrl} from '../environment';
@Injectable()
export class TeacherService{
    api:string;

    constructor(private http:HttpClient){
        this.api=`${apiUrl}/teachers`;
    }

    getTeachers():Observable<Teacher[]>{
        return this.http.get<Teacher[]>(`${this.api}`)
        .pipe(
            catchError(this.handleFailure)
        );
    }

    getTeacher(idTeacher:Number):Observable<Teacher>{
        return this.http.get<Teacher>(`${this.api}/${idTeacher}`)
        .pipe(
            catchError(this.handleFailure)
        );
    }

    getTeacherByName(name:String):Observable<Teacher[]>{
        return this.http.get<Teacher[]>(`${this.api}?name=${name}`)
            .pipe(
                catchError(this.handleFailure)
            );
    }

    addTeacherSocialMedia(teacher:Teacher):Observable<Teacher>{
        let headers=new HttpHeaders({
            "content-type":"application/json"
        });
        return this.http.patch<Teacher>(`${this.api}/socialMedias`,teacher,{headers})
        .pipe(
            catchError(this.handleFailure)
        )
    }

    addTeacher(teacher:Teacher):Observable<HttpResponse<Object>>{
        let headers=new HttpHeaders({
            "content-type":"application/json"
        });
        return this.http.post<HttpResponse<Object>>(`${this.api}`,teacher,{headers,observe:'response'})
                .pipe(
                    catchError(this.handleFailure)
                )
    }

    updateTeacher(idTeacher:number,teacher:Teacher):Observable<Teacher>{
        let headers=new HttpHeaders({
            "content-type":"application/json"
        });
        return this.http.patch<Teacher>(`${this.api}/${idTeacher}`,teacher,{headers})
                .pipe(
                    catchError(this.handleFailure)
                )
    }

    addPicture(idTeacher:string,file:File):Observable<Object>{
        /*var headers= new HttpHeaders({
            'content-type':'multipart/form-data'
        });*/
        var formData = new FormData();
        formData.append('id_teacher',idTeacher);
        formData.append('file',file,'form-data');
        return this.http.post(`${this.api}/picture`,formData,{responseType:'text'}).pipe(
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