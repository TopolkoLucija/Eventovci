package progi.project.eventovci.securityconfig.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import progi.project.eventovci.securityconfig.JWTGenerator;
import progi.project.eventovci.user.repository.UserRepository;

@Component
public class Convert {

    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    UserRepository userRepository;

    public Long convertToId(String token) {
        String username = jwtGenerator.getUsernameFromJWT(token);
        return userRepository.findUserByUsername(username).getId();
    }

    public String convertToUsername(String token) {
        return jwtGenerator.getUsernameFromJWT(token);
    }
}
