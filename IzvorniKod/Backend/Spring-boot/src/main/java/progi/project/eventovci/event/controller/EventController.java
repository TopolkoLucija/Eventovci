package progi.project.eventovci.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.event.controller.dto.AddEventDTO;
import progi.project.eventovci.event.controller.dto.EventInfoDTO;
import progi.project.eventovci.event.controller.dto.EventPrintDTO;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.event.service.EventService;
import progi.project.eventovci.securityconfig.auth.Convert;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("events")
public class EventController {

    @Autowired
    private Convert convert;

    @Autowired
    private EventService eventService;

    @PostMapping("/add")
    public ResponseEntity<Long> add(@RequestHeader("Authorization") String token, @RequestBody AddEventDTO eventDTO) {
        Event event = eventService.add(convert.convertToUser(token), eventDTO);
        return ResponseEntity.ok(event.getId());
    }

    @DeleteMapping("/delete/{filter}")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") String token, @PathVariable Long filter){
        eventService.delete(convert.convertToId(token), filter);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //vraća listu za ispis događaja kojima je korisnik odredio dolaznost
    @GetMapping("/myInterests/{option}")
    public ResponseEntity<List<EventPrintDTO>> interests(@RequestHeader("Authorization") String token, @PathVariable Integer option){
        List<EventPrintDTO> events = eventService.getInterests(convert.convertToId(token), option);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/inbox")
    public ResponseEntity<List<EventPrintDTO>> inbox(@RequestHeader("Authorization") String token){
        List<EventPrintDTO> events = eventService.getInbox(convert.convertToId(token));
        return ResponseEntity.ok(events);
    }

    //prikaz svih događaja u određenom vremenu
    @GetMapping("/all/{filter}")
    public ResponseEntity<List<EventPrintDTO>> allEvents(@RequestHeader("Authorization") String token, @PathVariable Integer filter ){
        List<EventPrintDTO> events = eventService.getEvents(filter);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/getEvent/{filter}")
    public ResponseEntity<EventInfoDTO> eventInfo(@RequestHeader("Authorization") String token, @PathVariable Long filter ){
        EventInfoDTO eventinfo = eventService.getInfo(filter);
        return ResponseEntity.ok(eventinfo);
    }

    @GetMapping("/myEvents")
    public ResponseEntity<List<EventPrintDTO>> myEvents(@RequestHeader("Authorization") String token) {
        List<EventPrintDTO> events = eventService.getMyEvents(convert.convertToId(token));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/myOldEvents")
    public ResponseEntity<List<EventPrintDTO>> myOldEvents(@RequestHeader("Authorization") String token) {
        List<EventPrintDTO> events = eventService.getMyOldEvents(convert.convertToId(token));
        return ResponseEntity.ok(events);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }


}
