package progi.project.eventovci.media.content.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.media.content.controller.dto.MediaDTO;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.service.MediaContentService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/media")
public class MediaContentController {

    @Autowired
    private MediaContentService mediaContentService;
    @GetMapping("/get/{filter}")
    public ResponseEntity<List<MediaDTO>> getMedia(@RequestHeader("Authorization") String token, @PathVariable Long filter) {
        List<MediaDTO> media = mediaContentService.get(filter);
        return ResponseEntity.ok(media);
    }

}
