package progi.project.eventovci.link.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.link.service.SocialMediaService;
import progi.project.eventovci.securityconfig.auth.Convert;

import java.util.List;

@RestController
@RequestMapping("/link")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private Convert convert;

    @PostMapping()
    public ResponseEntity<Void> add(@RequestHeader("Authorization") String token, @PathVariable String link) {
        Long userId = convert.convertToId(token);
        socialMediaService.add(link, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<String>> getLinks(@RequestHeader("Authorization") String token) {
        Long userId = convert.convertToId(token);
        return ResponseEntity.ok(socialMediaService.getAll(userId));
    }
}
