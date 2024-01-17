package progi.project.eventovci.review.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.event.entity.EventTooOldException;
import progi.project.eventovci.event.repository.EventRepository;
import progi.project.eventovci.event.entity.EventNotFoundException;
import progi.project.eventovci.review.controller.dto.ReviewDataDTO;
import progi.project.eventovci.review.entity.EventReview;
import progi.project.eventovci.review.entity.ReviewAlreadyExistsException;
import progi.project.eventovci.review.entity.UnAuthorizedAddException;
import progi.project.eventovci.review.repository.ReviewRepository;
import progi.project.eventovci.user.controller.dto.AllUserDataForm;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EventRepository eventRepository;

    public EventReview addReview(String text, Integer grade, Long userId, Long eventId) {
        User user = userRepository.findUserById(userId);
        if(user==null) {
            throw new UserNotFoundException("Korisnik ne postoji!");
        }
        Event event = eventRepository.findEventById(eventId);
        if (event==null) {
            throw new EventNotFoundException("Događanje ne postoji!");
        }
        Duration duration = Duration.between(event.getTimeOfTheEvent(), LocalDateTime.now());
        if (duration.toSeconds()>48*60*60) {
            throw new EventTooOldException("Događanje je završilo prije više od 48 sati!");
        }
        if (Objects.equals(event.getEventCoordinatorid(), user.getId())){
            throw new UnAuthorizedAddException("Ne možete recenzirati vlastito događanje!");
        }
        if (reviewRepository.existsByUserIdAndEventId(userId,eventId)) {
            throw new ReviewAlreadyExistsException("Već ste napisali recenziju za ovao događanje!");
        }
        return reviewRepository.save(new EventReview(text, grade, eventId, userId));

    }

    @Transactional
    public void deleteReview(Long userId, Long reviewId){
        EventReview review = reviewRepository.findEventReviewById(reviewId);
        User user = userRepository.findUserById(userId);
        if(review == null){
            throw new UnAuthorizedException("Recenzija ne postoji");
        }
        else{
            if(Objects.equals(user.getTypeOfUser(), "administrator") || Objects.equals(userId, review.getUser_id())) {
                reviewRepository.deleteEventReviewById(reviewId);
            }
            else{
                throw new UnAuthorizedException("Nije moguće obrisati recenziju!");
            }
        }
    }

    public List<ReviewDataDTO> allReviews(Long filter) {

        Event event = eventRepository.findEventById(filter);
        if (event == null){
            throw new UnAuthorizedException("Event ne postoji!");
        }

        List<EventReview> allReviews= reviewRepository.findAllEventReviews();
        List<ReviewDataDTO> reviewDataDTOList = new ArrayList<>();

        for (EventReview er : allReviews) {
            if (Objects.equals(er.getEvent_id(), filter)) {
                User user = userRepository.findUserById(er.getUser_id());
                ReviewDataDTO data = new ReviewDataDTO(er.getId(), er.getReviewText(), er.getGrade(), user.getId(), user.getUsername());
                reviewDataDTOList.add(data);
            }
        }
        return reviewDataDTOList;
    }
}
