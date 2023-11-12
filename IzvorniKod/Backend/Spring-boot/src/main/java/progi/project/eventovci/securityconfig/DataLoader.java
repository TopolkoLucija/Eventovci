package progi.project.eventovci.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User("admin", "admin@eventovci.com", passwordEncoder.encode("password"), "administrator", "Ilica 1", false);
        userRepository.save(user);
    }
}
