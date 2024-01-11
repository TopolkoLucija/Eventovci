package progi.project.eventovci.event.controller.dto;

import java.time.LocalDateTime;

public class EventPrintDTO {
    private Long id;
    private byte[] media;
    private String type;
    private String eventName;
    private LocalDateTime timeOfTheEvent;
    private String location;

    public EventPrintDTO() {
    }

    public EventPrintDTO(Long id, byte[] media, String type, String eventName, LocalDateTime timeOfTheEvent, String location) {
        this.id = id;
        this.media = media;
        this.type = type;
        this.eventName = eventName;
        this.timeOfTheEvent = timeOfTheEvent;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public byte[] getMedia() {
        return media;
    }

    public String getEventName() {
        return eventName;
    }

    public LocalDateTime getTimeOfTheEvent() {
        return timeOfTheEvent;
    }

    public String getLocation() {
        return location;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMedia(byte[] media) {
        this.media = media;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setTimeOfTheEvent(LocalDateTime timeOfTheEvent) {
        this.timeOfTheEvent = timeOfTheEvent;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
