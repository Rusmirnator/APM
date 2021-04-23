import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { catchError, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root' //NOTE: to register just for component&child: providers: [ProductService] in @C...
})
export class ProductService {
    private productUrl = 'api/products/products.json'; //NOTE: normally URL here
    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {

        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError) 
            );
    }
    private handleError(err: HttpErrorResponse){

        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}