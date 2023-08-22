package ticketManager.TM.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ticketManager.TM.entities.Ticket;

import java.util.Optional;
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Override
    public Optional<Ticket> findById(Long id);
    public Ticket findByTitle(String title);
}
