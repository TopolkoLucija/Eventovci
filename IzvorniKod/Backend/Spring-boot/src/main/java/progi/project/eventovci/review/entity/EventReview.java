package progi.project.eventovci.review.entity;

import jakarta.persistence.*;
import java.lang.*;
import java.util.Objects;

@Entity
@Table(name="recenzija")
public class EventReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_rezenczije")
    private Long id;

    @Column(name = "recenzija_tekst")
    private String reviewText;

    @Column(name="ocjena")
    private Integer grade;

    @Column(name="id_dogadjanja")
    private Long event_id;

    @Column(name="id_korisnik")
    private Long user_id;


    //konstruktor


    public EventReview(String reviewText, Integer grade, Long event_id, Long user_id) {
        this.reviewText = reviewText;
        this.grade = grade;
        this.event_id = event_id;
        this.user_id = user_id;
    }

    //equals i hash za id
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventReview that = (EventReview) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //geteri i seteri
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Long event_id) {
        this.event_id = event_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
