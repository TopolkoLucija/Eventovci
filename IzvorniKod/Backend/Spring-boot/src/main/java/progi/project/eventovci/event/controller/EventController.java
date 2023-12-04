package progi.project.eventovci.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.event.controller.dto.AddEventDTO;
import progi.project.eventovci.event.controller.dto.EventPrintDTO;
import progi.project.eventovci.event.controller.dto.IdFilter;
import progi.project.eventovci.event.service.EventService;
import progi.project.eventovci.securityconfig.auth.Convert;
import progi.project.eventovci.user.controller.dto.Filter;

import java.util.List;


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
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") String token, @RequestBody IdFilter filter){
        eventService.delete(convert.convertToId(token), filter.getFilter());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //vraća listu za ispis događaja kojima je korisnik odredio dolaznost
    @GetMapping("myInterests")
    public ResponseEntity<List<EventPrintDTO>> interests(@RequestHeader("Authorization") String token, @RequestBody Filter option){
        List<EventPrintDTO> events = eventService.getInterests(convert.convertToId(token), option.getFilter());
        return ResponseEntity.ok(events);
    }

    @GetMapping("inbox")
    public ResponseEntity<List<EventPrintDTO>> inbox(@RequestHeader("Authorization") String token){
        List<EventPrintDTO> events = eventService.getInbox(convert.convertToId(token));
        return ResponseEntity.ok(events);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }


}
