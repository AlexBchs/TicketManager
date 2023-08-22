import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../service/ticket.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})

export class TicketListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'state', 'date', 'delete'];
  dataSource = new MatTableDataSource<Ticket>();
  filterValues = {};
  filterSelectObj = [];

  constructor(private ticketServ: TicketService, pipe: DecimalPipe) {
    this.filterSelectObj = [
      {
        name: 'STATE',
        columnProp: 'state',
        options: []
      }
    ]
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTickets(): void {
    this.ticketServ.getTickets().subscribe(t => {
      this.dataSource.data = t;
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(t, o.columnProp);
      });
    });
  }

  ngOnInit(): void {
    this.getTickets();
    this.paginator._intl.itemsPerPageLabel = "Tickets to display per page";
    this.dataSource.filterPredicate = this.createFilter();
  }

  delete(ticket: Ticket) {
    this.ticketServ.deleteTicket(ticket.id).subscribe();
  }

  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  filterChange(filter, event) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col] && data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

}
