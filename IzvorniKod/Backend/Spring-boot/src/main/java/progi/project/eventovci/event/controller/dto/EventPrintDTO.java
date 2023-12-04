package progi.project.eventovci.event.controller.dto;

import java.time.LocalDateTime;

public class EventPrintDTO {
    private Long id;
    private byte[] media;
    private String eventName;
    private LocalDateTime timeOfTheEvent;
    private String location;

    public EventPrintDTO() {
    }

    public EventPrintDTO(Long id, byte[] media, String eventName, LocalDateTime timeOfTheEvent, String location) {
        this.id = id;
        this.media = media;
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
}
