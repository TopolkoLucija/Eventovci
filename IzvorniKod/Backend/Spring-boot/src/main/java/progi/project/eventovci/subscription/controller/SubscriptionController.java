package progi.project.eventovci.subscription.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import progi.project.eventovci.securityconfig.auth.Convert;
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
}
