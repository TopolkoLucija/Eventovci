package progi.project.eventovci.rsvp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.event.controller.dto.IdFilter;
import progi.project.eventovci.rsvp.service.RsvpService;
import progi.project.eventovci.securityconfig.auth.Convert;

import java.util.List;

@RestController
@RequestMapping("/rsvp")
public class RsvpController {

    @Autowired
    private RsvpService rsvpService;

    @Autowired
    private Convert convert;

    @GetMapping("/get/{filter}")
    public ResponseEntity<List<Integer>> getMyRsvp(@RequestHeader("Authorization") String token, @PathVariable Long filter) {
        List<Integer> rsvp = rsvpService.get(convert.convertToUser(token), filter);
        return ResponseEntity.ok(rsvp);
    }
}
