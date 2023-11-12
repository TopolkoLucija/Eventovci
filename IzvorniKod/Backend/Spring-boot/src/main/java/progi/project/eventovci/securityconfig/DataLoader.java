package progi.project.eventovci.securityconfig;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User("admin", "admin@eventovci.com", "$2a$10$N0qnEFuZlTuUaJ82aCqC9u0gV/txgl7r4ntinYsOZIgaDIT3KwPLW", "administrator", "Ilica 1", false);
        userRepository.save(user);
    }
}
