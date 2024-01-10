package progi.project.eventovci.rsvp.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.event.repository.EventRepository;
import progi.project.eventovci.rsvp.entity.UserResponse;
import progi.project.eventovci.rsvp.repository.UserResponseRepository;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RsvpService {

    @Autowired
    private UserResponseRepository userResponseRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Integer> get(User user, Long eventid) {
        UserResponse response = userResponseRepository.findByEventidAndUserid(eventid, user.getId());
        List<Integer> podaci = new ArrayList<>();
        if (response!=null) {
            String status = response.getStatus();
            podaci.add(switch (status) {
                case "dolazim" -> 1;
                case "mozda" -> 2;
                case "ne dolazim" -> 3;
                default -> 0;
            });
        } else {
            Event e = eventRepository.findEventById(eventid);
            if (Objects.equals(user.getTypeOfUser(), "administrator") || Objects.equals(user.getId(), e.getEventCoordinatorid())) {
                podaci.add(0);
            } else{
                podaci.add(-1);
            }
        }
        podaci.add(userResponseRepository.countAllByEventidAndStatus(eventid, "dolazim"));
        podaci.add(userResponseRepository.countAllByEventidAndStatus(eventid, "mozda"));
        podaci.add(userResponseRepository.countAllByEventidAndStatus(eventid, "ne dolazim"));

        return podaci;
    }

    @Transactional
    public void add(Long userId, Long eventId, Integer filter) {
        Event event = eventRepository.findEventById(eventId);
        if (Objects.equals(userId, event.getEventCoordinatorid())) {
            throw new UnAuthorizedException("Korisnik ne može dodati dolazak na vlastiti događaj!");
        }
        String status = switch (filter) {
            case 1 -> "dolazim";
            case 2 -> "mozda";
            case 3 -> "ne dolazim";
            default -> "";
        };
        Optional<UserResponse> userResponse = Optional.ofNullable(userResponseRepository.findByEventidAndUserid(eventId, userId));
        if (userResponse.isPresent()){
            if (!status.isEmpty()) {
                userResponseRepository.update(status, eventId, userId);
            } else {
                UserResponse userResponse1 = userResponse.get();
                userResponseRepository.delete(userResponse1);
            }
        } else {
            if (!status.isEmpty()) {
                userResponseRepository.save(new UserResponse(status, eventId, userId));
            }
        }
    }
}
