package progi.project.eventovci.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.repository.UserRepository;

import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        User korisnik = userRepository.findUserByUsername(username);
        if (korisnik != null && Objects.equals(korisnik.getPassword(), password)) {
            return korisnik;
        } else {
            throw new UserNotFoundException("Neispravno korisničko ime ili lozinka!");
        }

    }

}
