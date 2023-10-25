package progi.project.eventovci.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;
import progi.project.eventovci.user.repository.UserRepository;

import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        User user = userRepository.findUserByUsername(username);
        if (user != null && Objects.equals(user.getPassword(), password)) {
            return user;
        } else {
            throw new UserNotFoundException("Incorrect username or password!");
        }

    }

    public User register(String username, String email, String password, String typeOfUser, String homeAdress, Boolean shouldPayMembership) {
        User user = userRepository.findUserByEmail(email);
        if(user != null && Objects.equals(user.getEmail(), email)){
            throw new UserAlreadyExistsException("Neispravan email!");
        }
        user = userRepository.findUserByUsername(username);
        if(user != null && Objects.equals(user.getUsername(), username)) {
            throw new UserAlreadyExistsException("Neispravno korisničko ime!");
        }
        user = new User(username, email, password, typeOfUser, homeAdress, shouldPayMembership);
        userRepository.save(user);
        return user;
    }

}
