package progi.project.eventovci.media.content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.media.content.controller.dto.MediaDTO;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.repository.MediaContentRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class MediaContentService {

    @Autowired
    private MediaContentRepository mediaContentRepository;

    public List<MediaDTO> get(Long eventid) {
        List<MediaContent> media = mediaContentRepository.getAllByEventid(eventid);
        List<MediaDTO> mediaDTOS = new ArrayList<>();
        for (MediaContent mc : media) {
            mediaDTOS.add(new MediaDTO(mc.getContent(), mc.getType()));
        }
        return mediaDTOS;
    }
}
