package progi.project.eventovci.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.user.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);


    User findUserById(Long id);

    User findUserByEmail(String email);
    @Modifying
    @Query("UPDATE User u SET u.username = :username, u.email = :email, u.homeAdress = :homeAddress WHERE u.id = :id")
    void updateUserById(@Param("id") Long id, @Param("username") String username, @Param("email") String email, @Param("homeAddress") String homeAddress);

    @Query("SELECT u FROM User u")
    List<User> findAllUsers();

    void deleteUserById(Long id);
}
