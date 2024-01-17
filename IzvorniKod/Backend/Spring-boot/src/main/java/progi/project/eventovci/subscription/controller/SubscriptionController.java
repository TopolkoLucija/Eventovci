package progi.project.eventovci.subscription.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.securityconfig.auth.Convert;
import progi.project.eventovci.subscription.controller.dto.AddSubscriptionDTO;
import progi.project.eventovci.subscription.controller.dto.MySubscriptionsDTO;
import progi.project.eventovci.subscription.service.SubscriptionService;

import java.util.List;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private Convert convert;

    @GetMapping()
    public ResponseEntity<List<MySubscriptionsDTO>> get(@RequestHeader("Authorization") String token) {
        List<MySubscriptionsDTO> mySubscriptionsDTOS = subscriptionService.get(convert.convertToId(token));
        return ResponseEntity.ok(mySubscriptionsDTOS);
    }

    @PostMapping()
    public ResponseEntity<Void> add(@RequestHeader("Authorization") String token, @RequestBody AddSubscriptionDTO addSubscriptionDTO) {
        subscriptionService.add(convert.convertToId(token), addSubscriptionDTO.getTypes(), addSubscriptionDTO.getLocations());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
