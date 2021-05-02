import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError, tap} from "rxjs/operators";


import{IProduct} from "./product";
@Injectable({
    providedIn: 'root'
})

export class ProductService{
    private productUrl='api/products/products.json';
    constructor(private http: HttpClient){}
    //http request
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data =>  {console.log('IngetProducts'); console.log('All', JSON.stringify(data))}),
             catchError(this.handleError)
            
        )
        
}
private handleError(err: HttpErrorResponse){
    let errorMessage= '';
    if(err.error instanceof ErrorEvent) {
        //errorMessage=`An error occured: ${err.status}, error message is:${err.message}`
        errorMessage =  `An error occured: ${err.status},:${err.message}`;

    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}