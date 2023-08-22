package ticketManager.TM.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ticketManager.TM.entities.State;
import ticketManager.TM.entities.Ticket;
import ticketManager.TM.exception.ErrorResponse;
import ticketManager.TM.exception.TicketAlreadyExistsException;
import ticketManager.TM.exception.TicketDoesNotExistsException;
import ticketManager.TM.services.TicketService;
import java.util.*;

@RestController
@CrossOrigin(origins = {"${app.dev.frontend.local}"})
public class TicketController {
    @Autowired
    private TicketService ticketServ;

    @GetMapping("api/ticket/list")
    public List<Ticket> getAll() {
        return ticketServ.findAll();
    }

    @GetMapping("api/ticket/edit/{id}")
    public Ticket getOne(@PathVariable("id") Long id) {
        return ticketServ.findById(id);
    }

    @ExceptionHandler(value = TicketDoesNotExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse
    handleTicketDoesNotExistsException(TicketDoesNotExistsException ex)
    {
        return new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
    }

    @PostMapping("api/ticket/new")
    public void createTicket(@RequestBody Ticket t) {
        Date d = new Date();
        t.setDate(new Date(d.getYear(),d.getMonth(),d.getDate()));
        t.setState(State.NEW);
        ticketServ.save(t);
    }

    @ExceptionHandler(value = TicketAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse
    handleTicketAlreadyExistsException(TicketAlreadyExistsException ex)
    {
        return new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
    }

    @PutMapping("api/ticket/update/{id}")
    public Ticket update(@PathVariable long id, @RequestBody Ticket ticket) {
        Date d = new Date();
        ticket.setDate(new Date(d.getYear(),d.getMonth(),d.getDate()));
        return ticketServ.updateTicket(id, ticket);
    }

    @DeleteMapping("api/ticket/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        ticketServ.delete(id);
    }

}
