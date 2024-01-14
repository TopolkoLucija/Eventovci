package progi.project.eventovci.link.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.link.entity.SocialMediaLink;
import progi.project.eventovci.link.repository.LinkRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class SocialMediaService {

    @Autowired
    private LinkRepository linkRepository;

    public void add(String link, Long userId) {
        linkRepository.save(new SocialMediaLink(userId, link));
    }

    public List<String> getAll(Long userId) {
        List<SocialMediaLink> socialMediaLinks = linkRepository.findAllByEventCoordinatorId(userId);
        List<String> links = new ArrayList<>();
        for (SocialMediaLink l : socialMediaLinks) {
            links.add(l.getLink());
        }
        return links;
    }
}
