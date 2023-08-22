package ticketManager.TM.exception;

public class TicketAlreadyExistsException extends RuntimeException {
    private String message;

    public TicketAlreadyExistsException() {}

    public TicketAlreadyExistsException(String msg) {
        super(msg);
        this.message = msg;
    }
}
