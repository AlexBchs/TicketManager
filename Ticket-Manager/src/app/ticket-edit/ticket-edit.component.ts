import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../service/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {State} from "../model/State";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})

export class TicketEditComponent implements OnInit {
  ticket: Ticket | undefined;
  public states = Object.values(State);
  error: string;

  constructor(private ticketServ: TicketService, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); //Récupère le id dans l'URL
    this.ticketServ.getTicket(id).subscribe(
      t => {
        this.ticket = t;
      },
      error => {
        this.error = error;
      }
    );
  }

  save(): void {
    if (this.ticket) {
      this.ticketServ.updateTicket(this.ticket).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}
