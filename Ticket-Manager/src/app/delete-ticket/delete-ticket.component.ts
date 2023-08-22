import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Ticket} from "../model/ticket";
import {TicketService} from "../service/ticket.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})

export class DeleteTicketComponent implements OnInit {

  ticket: Ticket | undefined;

  constructor(private ticketServ: TicketService, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); //Récupère le id dans l'URL
    this.ticketServ.getTicket(id).subscribe(t => this.ticket = t);
  }

  delete(ticket: Ticket) {
    this.ticketServ.deleteTicket(ticket.id).subscribe();
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
