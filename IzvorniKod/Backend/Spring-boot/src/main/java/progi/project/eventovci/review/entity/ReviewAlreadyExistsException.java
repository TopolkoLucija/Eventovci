package progi.project.eventovci.review.entity;

public class ReviewAlreadyExistsException extends RuntimeException{
    public ReviewAlreadyExistsException(String message) {
        super(message);
    }
}
