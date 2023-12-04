package progi.project.eventovci.event.entity;

import jakarta.persistence.*;

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

    @Column(name="nazivdogadjanja")
    private String eventName;

    @Column(name="tipdogadjanja")
    private String typeOfEvent;

    @Column(name="lokacijadogadjanja")
    private String location;


    @Column(name="vrijemedogadjanja")
    private LocalDateTime timeOfTheEvent;

    @Column(name="trajanje")
    private Double duration;

    @Column(name="organizatorid")
    private Long eventCoordinatorid;

    @Column(name="cijenaulaznice")
    private Double ticketPrice;// 0 - besplatan dogadjaj

    @Column(name = "opis")
    private String text;


    //konstruktor
    public Event() {

    }

    public Event(String eventName, String typeOfEvent, String location, LocalDateTime timeOfTheEvent, Double duration, Long eventCoordinatorid, Double ticketPrice, String text) {
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

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
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
