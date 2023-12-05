package progi.project.eventovci.membership.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.event.controller.dto.IdFilter;
import progi.project.eventovci.membership.controller.dto.FilterPrice;
import progi.project.eventovci.membership.service.MembershipService;
import progi.project.eventovci.securityconfig.auth.Convert;

@RestController
@RequestMapping("/membership")
public class MembershipController {

    @Autowired
    private MembershipService membershipService;

    @Autowired
    Convert convert;

    @PostMapping()
    public ResponseEntity<Void> payMembership(@RequestHeader("Authorization") String token) {
        membershipService.payMembership(convert.convertToId(token));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/price")
    public ResponseEntity<Double> getPrice(@RequestHeader("Authorization") String token) {
        Double price = membershipService.getPrice(convert.convertToId(token));
        return ResponseEntity.ok(price);
    }

    @PostMapping("/changePrice/{filter}")
    public ResponseEntity<Void> changePrice(@RequestHeader("Authorization") String token, @PathVariable Double filter) {
        membershipService.changePrice(convert.convertToId(token), filter);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}
