import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../model/ticket";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('api/ticket/list', this.httpOptions);
  }

  deleteTicket(id: number) {
    const url = `api/ticket/delete/${id}`;
    return this.http.delete<Ticket>(url, this.httpOptions).pipe();
  }

  addTicket(t: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>('api/ticket/new', t, this.httpOptions).pipe();
  }

  getTicket(id: number): Observable<Ticket> {
    const url = `api/ticket/edit/${id}`;
    return this.http.get<Ticket>(url).pipe();
  }

  updateTicket(ticket: Ticket): Observable<any> {
    const url = `api/ticket/update/${ticket.id}`;
    return this.http.put(url, ticket, this.httpOptions).pipe();
  }

}
