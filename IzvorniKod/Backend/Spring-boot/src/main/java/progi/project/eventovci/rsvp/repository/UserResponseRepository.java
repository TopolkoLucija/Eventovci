package progi.project.eventovci.rsvp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import progi.project.eventovci.rsvp.entity.UserResponse;

import java.util.List;

public interface UserResponseRepository extends JpaRepository<UserResponse, Long> {

    List<UserResponse> findAllByUserid(Long userId);

    UserResponse findByEventidAndUserid(Long eventid, Long userid);

    Integer countAllByEventidAndStatus(Long eventid, String status);

}
