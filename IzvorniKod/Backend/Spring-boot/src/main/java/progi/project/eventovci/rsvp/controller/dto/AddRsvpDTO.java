package progi.project.eventovci.rsvp.controller.dto;

public class AddRsvpDTO {
    private Integer filter; //1 - sigurno dolazim, 2 - možda dolazim, 3 - ne dolazim
    private Long eventId;

    public AddRsvpDTO(Integer filter, Long eventId) {
        this.filter = filter;
        this.eventId = eventId;
    }

    public AddRsvpDTO(){}

    public Integer getFilter() {
        return filter;
    }

    public void setFilter(Integer filter) {
        this.filter = filter;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}
