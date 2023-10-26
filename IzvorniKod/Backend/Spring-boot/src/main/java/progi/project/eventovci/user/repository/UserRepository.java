package progi.project.eventovci.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);

    User findUserById(Long id);

    User findUserByEmail(String email);

    User save(User user);
}
