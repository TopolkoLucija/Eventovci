package progi.project.eventovci.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.review.entity.EventReview;
import progi.project.eventovci.user.entity.User;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<EventReview, Long> {
    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    EventReview findEventReviewById(Long id);

    @Query("SELECT r FROM EventReview r")
    List<EventReview> findAllEventReviews();

    void deleteEventReviewById(Long id);
}
