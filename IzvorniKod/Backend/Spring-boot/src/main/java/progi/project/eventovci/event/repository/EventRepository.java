package progi.project.eventovci.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.event.entity.Event;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.eventCoordinatorid = :id")
    List<Event> findAllByEventCoordinatorid(@Param("id") Long id);

    Event findEventById(Long id);

    void deleteEventById(Long id);

    Set<Event> findAllByLocationAndTimeOfTheEventAfter(String location, LocalDateTime time);

    Set<Event> findAllByTypeOfEventAndTimeOfTheEventAfter(String typeOfEvent, LocalDateTime time);

    List<Event> findAllByTimeOfTheEventIsBetween(LocalDateTime a, LocalDateTime b);

    List<Event> findAllByTimeOfTheEventAfter(LocalDateTime time);

}
