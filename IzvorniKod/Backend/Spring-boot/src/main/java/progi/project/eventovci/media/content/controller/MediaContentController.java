package progi.project.eventovci.media.content.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import progi.project.eventovci.media.content.controller.dto.MediaDTO;
import progi.project.eventovci.media.content.controller.dto.MediaRequest;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.service.MediaContentService;
import progi.project.eventovci.securityconfig.FileUploadService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @PostMapping(value = "/{type}", consumes = { "multipart/form-data"})
    public ResponseEntity<Void> add(
            @RequestHeader("Authorization") String token,
            @PathVariable String type,
            @RequestParam("file") MultipartFile file,
            @RequestParam("id") Long id) throws IOException {

        mediaContentService.add(file, type, id);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
