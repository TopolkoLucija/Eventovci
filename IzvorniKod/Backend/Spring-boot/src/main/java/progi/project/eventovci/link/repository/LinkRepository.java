package progi.project.eventovci.link.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.link.entity.SocialMediaLink;

import java.util.List;

@Repository
public interface LinkRepository extends JpaRepository<SocialMediaLink, Long> {

    List<SocialMediaLink> findAllByEventCoordinatorId(Long id);
}
