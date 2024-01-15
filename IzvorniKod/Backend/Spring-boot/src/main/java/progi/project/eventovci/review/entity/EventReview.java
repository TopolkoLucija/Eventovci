package progi.project.eventovci.review.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.user.entity.User;

import java.lang.*;
import java.util.Objects;

@Entity
@Table(name="recenzija")
public class EventReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idrecenzije")
    private Long id;

    @Column(name = "recenzijatekst", nullable = false, columnDefinition = "TEXT")
    private String reviewText;

    @Column(name="ocjena", nullable = false)
    private Integer grade;

    @Column(name="iddogadjanja", nullable = false)
    private Long eventId;

    @Column(name="idkorisnik", nullable = false)
    private Long userId;


     @ManyToOne
     @OnDelete(action = OnDeleteAction.CASCADE)
     @JoinColumn(name = "iddogadjanja", insertable = false, updatable = false)
     private Event event;

     @ManyToOne
     @OnDelete(action = OnDeleteAction.CASCADE)
     @JoinColumn(name = "idkorisnik", insertable = false, updatable = false)
     private User user;



    //konstruktor

    public EventReview() {

    }


    public EventReview(String reviewText, Integer grade, Long eventId, Long userId) {
        this.reviewText = reviewText;
        this.grade = grade;
        this.eventId = eventId;
        this.userId = userId;
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
        return eventId;
    }

    public void setEvent_id(Long event_id) {
        this.eventId = event_id;
    }

    public Long getUser_id() {
        return userId;
    }

    public void setUser_id(Long user_id) {
        this.userId = user_id;
    }
}
