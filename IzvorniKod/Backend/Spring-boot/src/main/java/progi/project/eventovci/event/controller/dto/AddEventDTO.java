package progi.project.eventovci.event.controller.dto;

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
    private List<byte[]> media;

    public AddEventDTO(String eventName, String typeOfEvent, String location, LocalDateTime timeOfTheEvent, Double duration, Double ticketPrice, String text, List<byte[]> media) {
        this.eventName = eventName;
        this.typeOfEvent = typeOfEvent;
        this.location = location;
        this.timeOfTheEvent = timeOfTheEvent;
        this.duration = duration;
        this.ticketPrice = ticketPrice;
        this.text = text;
        this.media = media;
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

    public Double getDuration() {
        return duration;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public String getText() {
        return text;
    }

    public List<byte[]> getMedia() {
        return media;
    }
}
