package progi.project.eventovci.event.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.review.entity.EventReview;
import progi.project.eventovci.rsvp.entity.UserResponse;
import progi.project.eventovci.user.entity.User;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.lang.Long;


@Entity
@Table(name="dogadjanje")
public class Event {

    @Id
    @Column(name="iddogadjanja")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nazivdogadjanja", nullable = false, length = 255)
    private String eventName;

    @Column(name="tipdogadjanja", nullable = false, length = 255)
    private String typeOfEvent;

    @Column(name="lokacijadogadjanja", nullable = false, length = 255)
    private String location;


    @Column(name="vrijemedogadjanja", nullable = false)
    private LocalDateTime timeOfTheEvent;

    @Column(name="trajanje", nullable = false)
    private Time duration;

    @Column(name="organizatorid", nullable = false)
    private Long eventCoordinatorid;

    @Column(name="cijenaulaznice", nullable = false)
    private Double ticketPrice;

    @Column(name = "opis", length = 1500)
    private String text;


     @ManyToOne
     @OnDelete(action = OnDeleteAction.CASCADE)
     @JoinColumn(name = "organizatorid", insertable = false, updatable = false)
     private User eventCoordinator;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaContent> mediaContents;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventReview> eventReviews;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserResponse> userResponses;



    //konstruktor
    public Event() {

    }

    public Event(String eventName, String typeOfEvent, String location, LocalDateTime timeOfTheEvent, Time duration, Long eventCoordinatorid, Double ticketPrice, String text) {
        this.eventName = eventName;
        this.typeOfEvent = typeOfEvent;
        this.location = location;
        this.timeOfTheEvent = timeOfTheEvent;
        this.duration = duration;
        this.eventCoordinatorid = eventCoordinatorid;
        this.ticketPrice = ticketPrice;
        this.text = text;
    }

    //equals i hash za id

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
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

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getTypeOfEvent() {
        return typeOfEvent;
    }

    public void setTypeOfEvent(String typeOfEvent) {
        this.typeOfEvent = typeOfEvent;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getTimeOfTheEvent() {
        return timeOfTheEvent;
    }

    public void setTimeOfTheEvent(LocalDateTime timeOfTheEvent) {
        this.timeOfTheEvent = timeOfTheEvent;
    }

    public Time getDuration() {
        return duration;
    }

    public void setDuration(Time duration) {
        this.duration = duration;
    }

    public Long getEventCoordinatorid() {
        return eventCoordinatorid;
    }

    public void setEventCoordinatorid(Long eventCoordinatorid) {
        this.eventCoordinatorid = eventCoordinatorid;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
