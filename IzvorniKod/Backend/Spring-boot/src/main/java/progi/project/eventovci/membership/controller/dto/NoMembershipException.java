package progi.project.eventovci.membership.controller.dto;

public class NoMembershipException extends RuntimeException{
    public NoMembershipException(String message) {
        super(message);
    }
}
