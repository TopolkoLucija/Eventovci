package progi.project.eventovci.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.event.controller.dto.AddEventDTO;
import progi.project.eventovci.event.controller.dto.EventFilter;
import progi.project.eventovci.event.service.EventService;
import progi.project.eventovci.securityconfig.auth.Convert;


@RestController
@RequestMapping("events")
public class EventController {

    @Autowired
    private Convert convert;

    @Autowired
    private EventService eventService;

    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestHeader("Authorization") String token, @RequestBody AddEventDTO eventDTO) {
        eventService.add(convert.convertToUser(token), eventDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") String token, @RequestBody EventFilter filter){
        eventService.delete(convert.convertToId(token), filter.getFilter());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}
