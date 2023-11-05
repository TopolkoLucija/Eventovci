package progi.project.eventovci.review.controller.dto;


public class AddReviewDTO {

    private String reviewText;

    private Integer grade;

    private Long eventId;


    public String getReviewText() {
        return reviewText;
    }

    public Integer getGrade() {
        return grade;
    }

    public Long getEventId() {
        return eventId;
    }


    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

}
