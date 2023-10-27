package progi.project.eventovci.user.controller.dto;

import java.time.LocalDateTime;

public class EventData {
    private String eventName;
    private String typeOfEvent;
    private byte[] picture;

    public EventData() {

    }

    public EventData(String eventName, String typeOfEvent, byte[] picture) {
        this.eventName = eventName;
        this.typeOfEvent = typeOfEvent;
        this.picture = picture;
    }

    public String getEventName() {
        return eventName;
    }

    public String getTypeOfEvent() {
        return typeOfEvent;
    }

    public byte[] getPicture() {return picture;}
}
