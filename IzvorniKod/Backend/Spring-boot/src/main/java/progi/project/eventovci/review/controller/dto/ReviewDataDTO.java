package progi.project.eventovci.review.controller.dto;

public class ReviewDataDTO {
    private String reviewText;

    private Integer grade;

    private Long userId;

    private String username;

    public String getReviewText() {
        return reviewText;
    }

    public Integer getGrade() {
        return grade;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public ReviewDataDTO(){

    }

    public ReviewDataDTO(String reviewText, Integer grade, Long userId, String username) {
        this.reviewText = reviewText;
        this.grade = grade;
        this.userId = userId;
        this.username = username;
    }
}
