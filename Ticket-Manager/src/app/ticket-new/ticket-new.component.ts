import {Component, OnInit} from '@angular/core';
import {State} from "../model/State";
import {TicketService} from "../service/ticket.service";
import {Ticket} from "../model/ticket";
import {Location} from "@angular/common";

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})

export class TicketNewComponent implements OnInit {
  tickets: Ticket[] = [];
  submitted = false;
  error = false;
  newDate: Date = new Date('yyyy-MM-dd');
  model = new Ticket(20, '', '', this.newDate, State.New);

  constructor(private ticketServ: TicketService, private location: Location) {}

  add(): void {
    this.model.title = this.model.title.trim();
    this.model.description = this.model.description.trim();

    for (let t of this.tickets) {
      if (t.title == this.model.title) {
        this.error = true;
      }
    }

    if (!this.error) {
      this.ticketServ.addTicket(this.model)
        .subscribe(t => {
          this.tickets.push(t);
        });
      this.submitted = true;
    }
  }

  getTickets(): void {
    this.ticketServ.getTickets().subscribe(t => this.tickets = t);
  }

  ngOnInit(): void {
    this.getTickets();
  }

  goBack(): void {
    this.location.back();
  }

  chgError() {
    this.error = false;
    this.submitted = false;
  }
}
