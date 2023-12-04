package progi.project.eventovci.user.controller.dto;

import progi.project.eventovci.event.controller.dto.EventDataDTO;

import java.time.LocalDateTime;
import java.util.List;

public class ProfileForm {

    private String username;
    private String email;
    private String typeOfUser;
    private String homeAdress;
    private LocalDateTime membershipTime;

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

    public LocalDateTime getMembershipTime() {
        return membershipTime;
    }

    public ProfileForm(){

    }
    public ProfileForm(String username, String email, String typeOfUser, String homeAdress, LocalDateTime membershipTime) {
        this.username = username;
        this.email = email;
        this.typeOfUser = typeOfUser;
        this.homeAdress = homeAdress;
        this.membershipTime = membershipTime;
    }
}
