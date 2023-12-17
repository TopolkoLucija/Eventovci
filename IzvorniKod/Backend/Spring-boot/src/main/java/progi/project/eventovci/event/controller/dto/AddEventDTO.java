package progi.project.eventovci.event.controller.dto;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public class AddEventDTO {
    private String eventName;
    private String typeOfEvent;
    private String location;
    private LocalDateTime timeOfTheEvent;
    private Double duration;
    private Double ticketPrice;
    private String text;

    public AddEventDTO(String eventName, String typeOfEvent, String location, LocalDateTime timeOfTheEvent, Double duration, Double ticketPrice, String text) {
        this.eventName = eventName;
        this.typeOfEvent = typeOfEvent;
        this.location = location;
        this.timeOfTheEvent = timeOfTheEvent;
        this.duration = duration;
        this.ticketPrice = ticketPrice;
        this.text = text;
    }

    public AddEventDTO(){}

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

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
