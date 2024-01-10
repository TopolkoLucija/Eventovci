package progi.project.eventovci.event.controller.dto;

import java.sql.Time;
import java.time.LocalDateTime;

public class EventInfoDTO {
    private String eventName;
    private String typeOfEvent;
    private String location;
    private LocalDateTime timeOfTheEvent;
    private Time duration;
    private Double ticketPrice;
    private Long eventCoordinatorid;
    private String username;


    public String getUsername() {
        return username;
    }

    public String getEventName() {
        return eventName;
    }

    public String getTypeOfEvent() {
        return typeOfEvent;
    }

    public String getLocation() {
        return location;
    }

    public LocalDateTime getTimeOfTheEvent() {
        return timeOfTheEvent;
    }

    public Time getDuration() {
        return duration;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public Long getEventCoordinatorid() {
        return eventCoordinatorid;
    }

    public EventInfoDTO(){

    }
    public EventInfoDTO(String eventName, String typeOfEvent, String location, LocalDateTime timeOfTheEvent, Time duration, Double ticketPrice, Long eventCoordinatorid, String username) {
        this.eventName = eventName;
        this.typeOfEvent = typeOfEvent;
        this.location = location;
        this.timeOfTheEvent = timeOfTheEvent;
        this.duration = duration;
        this.ticketPrice = ticketPrice;
        this.eventCoordinatorid = eventCoordinatorid;
        this.username = username;
    }
}
