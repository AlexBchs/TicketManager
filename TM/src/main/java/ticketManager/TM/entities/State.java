package ticketManager.TM.entities;

public enum State {
    NEW("New"), TODO("ToDo"), DONE("Done"), DOING("Doing");

    private String text;

    State(String text){this.text = text;}
}
