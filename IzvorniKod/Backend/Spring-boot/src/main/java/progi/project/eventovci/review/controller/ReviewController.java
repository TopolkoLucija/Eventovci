package progi.project.eventovci.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.review.controller.dto.AddReviewDTO;
import progi.project.eventovci.review.entity.EventReview;
import progi.project.eventovci.review.service.ReviewService;
import progi.project.eventovci.securityconfig.JWTGenerator;
import progi.project.eventovci.securityconfig.auth.Convert;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;
import progi.project.eventovci.user.repository.UserRepository;
import progi.project.eventovci.user.service.UserService;

import java.util.logging.Logger;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    Convert convert;

    @PostMapping()
    public ResponseEntity<EventReview> add(@RequestHeader("Authorization") String token, @RequestBody AddReviewDTO dto){
        EventReview review = reviewService.addReview(dto.getReviewText(), dto.getGrade(), convert.convertToId(token) , dto.getEventId());
        return ResponseEntity.ok(review);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
}
