package progi.project.eventovci.event.controller.dto;

import java.time.LocalDateTime;

public class EventDataDTO {
    private String eventName;
    private String location;
    private LocalDateTime timeOfTheEvent;
    private byte[] picture;

    public EventDataDTO() {

    }

    public EventDataDTO(String eventName, String location, LocalDateTime timeOfTheEvent, byte[] picture) {
        this.eventName = eventName;
        this.location = location;
        this.timeOfTheEvent=timeOfTheEvent;
        this.picture = picture;
    }

    public String getEventName() {
        return eventName;
    }

    public byte[] getPicture() {return picture;}

    public String getLocation() {
        return location;
    }

    public LocalDateTime getTimeOfTheEvent() {
        return timeOfTheEvent;
    }
}
