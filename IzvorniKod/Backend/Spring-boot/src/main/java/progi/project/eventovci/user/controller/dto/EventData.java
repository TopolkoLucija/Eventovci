package progi.project.eventovci.user.controller.dto;

import java.time.LocalDateTime;

public class EventData {
    private String eventName;
    private String typeOfEvent;
    private String picture;

    public EventData() {

    }

    public EventData(String eventName, String typeOfEvent, String picture) {
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

    public String getPicture() {
        return picture;
    }
}
