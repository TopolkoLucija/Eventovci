package progi.project.eventovci.event.entity;

public class EventTooOldException extends RuntimeException{
    public EventTooOldException(String message) {
        super(message);
    }
}
