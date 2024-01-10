package progi.project.eventovci.user.controller.dto;

public class AllUserDataForm {
    private Long userId;
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

    public Long getUserId() {
        return userId;
    }

    public AllUserDataForm(){
    }
    public AllUserDataForm(Long userId, String username, String email, String typeOfUser) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.typeOfUser = typeOfUser;
    }

}
