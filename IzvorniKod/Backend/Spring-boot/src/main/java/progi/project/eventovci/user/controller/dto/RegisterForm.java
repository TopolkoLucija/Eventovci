package progi.project.eventovci.user.controller.dto;

public class RegisterForm {
    private String username;
    private String password;
    private String email;
    private String typeOfUser;
    private String homeAdress;
    private Boolean shouldPayMembership;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
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
}