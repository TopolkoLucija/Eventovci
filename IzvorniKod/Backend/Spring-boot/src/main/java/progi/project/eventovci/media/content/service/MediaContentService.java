package progi.project.eventovci.media.content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import progi.project.eventovci.media.content.controller.dto.MediaDTO;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.repository.MediaContentRepository;
import progi.project.eventovci.securityconfig.FileUploadService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MediaContentService {

    @Autowired
    private MediaContentRepository mediaContentRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public List<MediaDTO> get(Long eventid) {
        List<MediaContent> media = mediaContentRepository.getAllByEventid(eventid);
        List<MediaDTO> mediaDTOS = new ArrayList<>();
        for (MediaContent mc : media) {
            mediaDTOS.add(new MediaDTO(mc.getContent(), mc.getType()));
        }
        return mediaDTOS;
    }

    public void add(MultipartFile file, String type, Long eventId) throws IOException {
        String path = fileUploadService.uploadanje(file, eventId, type);
        MediaContent mediaContent = new MediaContent(path, type, eventId);
        mediaContentRepository.save(mediaContent);
    }
}
