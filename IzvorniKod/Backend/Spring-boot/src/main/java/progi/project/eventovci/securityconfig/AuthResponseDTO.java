package progi.project.eventovci.securityconfig;

import progi.project.eventovci.user.entity.User;

public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private User user;

    public AuthResponseDTO(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
