package ticketManager.TM.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ticketManager.TM.entities.Ticket;
import ticketManager.TM.exception.TicketAlreadyExistsException;
import ticketManager.TM.exception.TicketDoesNotExistsException;
import ticketManager.TM.repositories.TicketRepository;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    public Ticket findByTitle(String title) {
        return ticketRepository.findByTitle(title);
    }

    public String save(Ticket ticket) {
        Ticket alreadyExists = ticketRepository.findByTitle(ticket.getTitle());
        if (alreadyExists == null) {
            ticketRepository.save(ticket);
            return "Ticket added successfully !";
        }
        else {
            throw new TicketAlreadyExistsException("Ticket with title '"+ alreadyExists.getTitle() +"' already exists !");
        }
    }

    public Ticket findById(Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new TicketDoesNotExistsException("The ticket with id "+ id +" doest not exists !"));
    }

    public void delete(Long id) {
        ticketRepository.deleteById(id);
    }

    public Ticket updateTicket(Long id, Ticket ticket) {
        return ticketRepository.findById(id)
                .map(t -> {
                    t.setTitle(ticket.getTitle());
                    t.setDescription(ticket.getDescription());
                    t.setState(ticket.getState());
                    t.setDate(ticket.getDate());
                    return ticketRepository.save(t);
                }).orElseThrow(() -> new TicketDoesNotExistsException("The ticket with id "+ id +" doest not exists !"));
    }
}
