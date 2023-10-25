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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_dogadjanja")
    private Long id;

    @Column(name="naziv_dogadjanja")
    private String eventName;

    @Column(name="tip dogadjanja")
    private String typeOfEvent;

    @Column(name="lokacija_dogadjanja")
    private String location;


    @Column(name="vrijeme_dogadjanja")
    private LocalDateTime timeOfTheEvent;

    @Column(name="trajanje")
    private Double duration;

    @Column(name="organizator_id")
    private Long eventCoordinator_id;

    @Column(name="cijena_ulaznice")
    private Double ticketPrice;// 0 - besplatan dogadjaj


    //konstruktor
    public Event() {

    }

    public Event(String eventName, String typeOfEvenet, String location, LocalDateTime timeOfTheEvent, Double duration, Long eventCoordinator_id, Double ticketPrice) {
        this.eventName = eventName;
        this.typeOfEvent = typeOfEvenet;
        this.location = location;
        this.timeOfTheEvent = timeOfTheEvent;
        this.duration = duration;
        this.eventCoordinator_id = eventCoordinator_id;
        this.ticketPrice = ticketPrice;
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

    public Long getEventCoordinator_id() {
        return eventCoordinator_id;
    }

    public void setEventCoordinator_id(Long eventCoordinator_id) {
        this.eventCoordinator_id = eventCoordinator_id;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
