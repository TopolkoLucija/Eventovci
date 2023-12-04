package progi.project.eventovci.event.controller.dto;

public class IdFilter {
    private Long filter;

    public IdFilter(){

    }
    public IdFilter(Long filter) {
        this.filter = filter;
    }

    public Long getFilter() {
        return filter;
    }
}
