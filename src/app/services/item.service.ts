import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item, ItemsResponse, ItemResponse } from '../model/model';


@Injectable({ providedIn: 'root' })
export class ItemService {

  private itemUrl = 'api/item';
  private itemsUrl = 'api/items';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getItemsResponse(page: number): Observable<ItemsResponse> {
    return this.http.get<ItemsResponse>(`${this.itemUrl}?p=${page}`)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<ItemsResponse>('getItems', null))
      );
  }

  //////// Save methods //////////

  addItem(item: Item): Observable<Item> {
    return this.http.post<ItemResponse>(this.itemUrl, item, this.httpOptions).pipe(
      map((response: ItemResponse) => response.item),
      tap((newItem: Item) => this.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }


  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.itemUrl}/${item.id}`, item, this.httpOptions).pipe(
      tap((updatedItem: Item) => this.log(`updated item w/ id=${updatedItem.id}`)),
      catchError(this.handleError<Item>('update'))
    );
  }

  completeItem(item: Item, completed: Boolean): Observable<Item> {
    return this.http.post<Item>(`${this.itemsUrl}/${item.id}/status?complete=${completed}`, this.httpOptions).pipe(
      catchError(this.handleError<Item>('update'))
    );
  }

  deleteItem(item: Item): Observable<Item> {
    const url = `${this.itemUrl}/${item.id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${item.id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log an ItemService message with the MessageService */
  private log(message: string) {
    console.log(`ItemService: ${message}`);
  }
}
