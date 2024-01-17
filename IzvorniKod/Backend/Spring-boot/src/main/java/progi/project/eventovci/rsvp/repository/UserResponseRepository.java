package progi.project.eventovci.rsvp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import progi.project.eventovci.rsvp.entity.UserResponse;

import java.util.List;

public interface UserResponseRepository extends JpaRepository<UserResponse, Long> {

    List<UserResponse> findAllByUserid(Long userId);

    UserResponse findByEventidAndUserid(Long eventid, Long userid);

    Integer countAllByEventidAndStatus(Long eventid, String status);

    @Modifying
    @Query("UPDATE UserResponse dk SET dk.status = :status WHERE dk.userid = :userId AND dk.eventid = :eventId")
    void update(@Param("status") String status, @Param("eventId") Long eventId, @Param("userId") Long userId);
}
