package progi.project.eventovci.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.review.entity.EventReview;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<EventReview, Long> {
    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    EventReview findEventReviewById(Long id);
}
