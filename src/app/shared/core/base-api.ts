import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class BaseApi {

  private BaseUrl = 'http://localhost:3004/';

  constructor(
    public http: HttpClient
  ){}

  private getUrl(url: string = ''): string {
    return this.BaseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string = '', date: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), date);
  }

  public put(url: string = '', date: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), date);
  }
}