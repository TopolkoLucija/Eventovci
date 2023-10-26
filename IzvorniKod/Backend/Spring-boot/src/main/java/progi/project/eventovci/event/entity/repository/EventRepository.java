package progi.project.eventovci.event.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.event.entity.Event;

import java.util.List;
import java.util.Map;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.eventCoordinatorid = :id")
    List<Event> findAllByEventCoordinatorid(@Param("id") Long id);

}
