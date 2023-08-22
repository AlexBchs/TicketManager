package ticketManager.TM.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "TICKET")
@AllArgsConstructor
@NoArgsConstructor
public class Ticket implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @NotNull
    @Size(min = 2, max = 30, message = "Title must be between 2 and 30 characters")
    @Column(name = "TITLE")
    private String title;

    @NotNull
    @Size(min = 10, max = 100, message = "Description must be between 10 and 100 characters")
    private String description;

    @Enumerated(EnumType.STRING)
    private State state;

    private Date date;

    public Ticket(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Ticket(String title, String description, State state) {
        this.title = title;
        this.description = description;
        this.state = state;
    }

    public Ticket(String title, String description, Date date) {
        this.title = title;
        this.description = description;
        this.state = State.NEW;
        this.date = date;
    }

    public Ticket(String title, String description, State state, Date date) {
        this.title = title;
        this.description = description;
        this.state = state;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}
