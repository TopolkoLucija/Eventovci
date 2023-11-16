package progi.project.eventovci.user.controller.dto;

public class AllUserDataForm {
    private String username;
    private String email;
    private String typeOfUser;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getTypeOfUser() {
        return typeOfUser;
    }

    public AllUserDataForm(){

    }
    public AllUserDataForm(String username, String email, String typeOfUser) {
        this.username = username;
        this.email = email;
        this.typeOfUser = typeOfUser;
    }

}
