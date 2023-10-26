package progi.project.eventovci.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import progi.project.eventovci.review.controller.dto.AddReviewDTO;
import progi.project.eventovci.review.entity.EventReview;
import progi.project.eventovci.review.service.ReviewService;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;

import java.util.logging.Logger;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping()
    public ResponseEntity<EventReview> add(@RequestBody AddReviewDTO dto){
        EventReview review = reviewService.addReview(dto.getReviewText(), dto.getGrade(), dto.getUserId(), dto.getEventId());
        return ResponseEntity.ok(review);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
}
