package progi.project.eventovci.media.content.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.media.content.entity.MediaContent;

import java.util.List;
@Repository
public interface MediaContentRepository extends JpaRepository<MediaContent, Long> {

    MediaContent findFirstByEventidAndType(Long eventid, String type);
    List<MediaContent> getAllByEventid(Long eventid);


}
