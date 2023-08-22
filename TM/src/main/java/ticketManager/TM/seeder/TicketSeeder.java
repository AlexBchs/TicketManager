package ticketManager.TM.seeder;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ticketManager.TM.entities.State;
import ticketManager.TM.entities.Ticket;
import ticketManager.TM.services.TicketService;
import java.util.Date;

@Component
public class TicketSeeder implements CommandLineRunner {
    @Autowired
    TicketService ticketServ;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        createTicket("Ticket1","Pb PC",State.NEW, new Date(2018-1900,11-1,5));
        createTicket("Ticket2","Changement du disque dur de mon ordinateur",State.DOING, new Date(2011-1900,9-1,19));
        createTicket("Ticket8","Ecran abimé",State.NEW, new Date(1997-1900,9-1,26));
        createTicket("Ticket9","Mon ordinateur ne démarre plus",State.NEW, new Date(2021-1900,4-1,16));
        createTicket("Ticket23","Issues with printer",State.DONE, new Date(2004-1900,6-1,9));
        createTicket("Ticket37996","Pb PC, connexion internet inexistante, lenteur dans l'utilisation des logiciels de design",State.TODO, new Date(2022-1900,1-1,31));
        createTicket("Soucis Internet","Je ne peux plus aller sur Google",State.DOING, new Date(2018-1900,11-1,5));
        createTicket("Ordinateur lent","Le matin c'est très long pour commencer",State.TODO, new Date(2019-1900,8-1,13));
        createTicket("Very Urgent","Pb PC complet - URGENT",State.NEW, new Date(2020-1900,6-1,21));
        createTicket("PC does not turn on anymore","I need a new PC ASAP",State.TODO, new Date(2022-1900,2-1,27));
        createTicket("Impossible d'installer le logiciel","Problème de compatibilitè des logiciels, je ne parviens pas à installer le logiciel de compta",State.TODO, new Date(2021-1900,9-1,2));
    }

    private void createTicket(String title, String description, State state, Date date) {
        Ticket t = ticketServ.findByTitle(title);

        if (t == null) {
            t = new Ticket(title, description, state, date);
            ticketServ.save(t);
        }
    }
}
