package progi.project.eventovci.review.entity;

public class UnAuthorizedAddException extends RuntimeException{
    public UnAuthorizedAddException(String message) {
        super(message);
    }
}
