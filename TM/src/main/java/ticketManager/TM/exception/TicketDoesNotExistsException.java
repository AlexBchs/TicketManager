package ticketManager.TM.exception;

public class TicketDoesNotExistsException extends RuntimeException {

    private String message;

    public TicketDoesNotExistsException() {}

    public TicketDoesNotExistsException(String msg) {
        super(msg);
        this.message = msg;
    }
}
