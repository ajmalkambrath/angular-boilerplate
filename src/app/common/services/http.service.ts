import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient) {}

    /**
     * @methodName get
     * @description method used to get the data from sever
     * @param url<string>, headers<HttpHeaders>
     * return observable <any>
     */
    get(url: string, headers?: HttpHeaders ): Observable<any> {
        return this.http.get(url, { headers });
    }

    /**
     * @methodName post
     * @description used to post the data to sever
     * @param url<string>, payLoad<Object>, headers?<HttpHeaders>
     * return observable <any>
     */
     post(
      url: string,
      payLoad: any,
      headers?: HttpHeaders): Observable<any> {
      return this.http.post(encodeURI(url), payLoad, { headers });
  }
    /**
     * @methodName put
     * @description method used to post the data to sever
     * @param <string>, payLoad<Object>, headers?<HttpHeaders>
     * return observable <any>
     */
    put(url: string, payLoad?: any, headers?: HttpHeaders ): Observable<any> {
        return this.http.put(encodeURI(url), payLoad, { headers });
    }

    /**
     * @methodName patch
     * @description used to send patch data to sever
     * @param url<string>, payLoad<Object>
     * return observable <any>
     */
    patch(url: string, payLoad?: any): Observable<any> {
        return this.http.patch(url, payLoad);
    }

    /**
     * @methodName delete
     * @description used to delete the data from sever
     * @param url<string>
     * return observable <any>
     */
    delete(url: string): Observable<any> {
        return this.http.delete(url);
    }
}

