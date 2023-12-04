package progi.project.eventovci.event.controller.dto;

import progi.project.eventovci.event.entity.Event;

public class EventFilter {
    private Long filter;

    public EventFilter(){

    }
    public EventFilter(Long filter) {
        this.filter = filter;
    }

    public Long getFilter() {
        return filter;
    }
}
