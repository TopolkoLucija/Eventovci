package progi.project.eventovci.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.review.controller.dto.AddReviewDTO;
import progi.project.eventovci.review.controller.dto.ReviewDataDTO;
import progi.project.eventovci.review.entity.EventReview;
import progi.project.eventovci.review.service.ReviewService;
import progi.project.eventovci.securityconfig.auth.Convert;

import java.util.List;

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

    @DeleteMapping("/delete/{filter}")
    public ResponseEntity<Void> delete(@RequestHeader("Authorization") String token, @PathVariable Long filter){
        reviewService.deleteReview(convert.convertToId(token) , filter);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get/{filter}")
    public ResponseEntity<List<ReviewDataDTO>> allReviews(@RequestHeader("Authorization") String token, @PathVariable Long filter) {
        List<ReviewDataDTO> data = reviewService.allReviews(filter);
        return ResponseEntity.ok(data);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
}
