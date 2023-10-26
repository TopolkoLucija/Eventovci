package progi.project.eventovci.user.controller.dto;

import progi.project.eventovci.user.controller.dto.EventData;
import java.util.List;

public class DataForm {

    private String username;
    private String email;
    private String typeOfUser;
    private String homeAdress;
    private Boolean shouldPayMembership;

    private List<EventData> eventList;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getTypeOfUser() {
        return typeOfUser;
    }

    public String getHomeAdress() {
        return homeAdress;
    }

    public Boolean getShouldPayMembership() {
        return shouldPayMembership;
    }

    public List<EventData> getEventList() {
        return eventList;
    }

    public void setEventList(List<EventData> eventList) {
        this.eventList = eventList;
    }

    public DataForm(){

    }
    public DataForm(String username, String email, String typeOfUser, String homeAdress, Boolean shouldPayMembership, List<EventData> eventList) {
        this.username = username;
        this.email = email;
        this.typeOfUser = typeOfUser;
        this.homeAdress = homeAdress;
        this.shouldPayMembership = shouldPayMembership;
        this.eventList = eventList;
    }
}
