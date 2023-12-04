package progi.project.eventovci.event.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.event.controller.dto.AddEventDTO;
import progi.project.eventovci.event.controller.dto.EventPrintDTO;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.event.repository.EventRepository;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.entity.repository.MediaContentRepository;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.membership.repository.MembershipRepository;
import progi.project.eventovci.rsvp.entity.UserResponse;
import progi.project.eventovci.rsvp.repository.UserResponseRepository;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.repository.UserRepository;
import progi.project.eventovci.membership.controller.dto.NoMembershipException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private MediaContentRepository mediaContentRepository;

    @Autowired
    private UserResponseRepository userResponseRepository;

    public void add(User user, AddEventDTO eventDTO) {

        if (!Objects.equals(user.getTypeOfUser(), "organizator")) {
            throw new UnAuthorizedException("Korisnik nije organizator!");
        }

        if (eventDTO.getTicketPrice()!=0) {
            Membership membership = membershipRepository.findByUserIdOrderByValidUntilDesc(user.getId());
            if (membership==null || membership.getValidUntil().isBefore(LocalDateTime.now())){
                throw new NoMembershipException("Korisnik nije platio članarinu!");
            }
        }

        Event event = new Event(eventDTO.getEventName(), eventDTO.getTypeOfEvent(), eventDTO.getLocation(), eventDTO.getTimeOfTheEvent(), eventDTO.getDuration(), user.getId(), eventDTO.getTicketPrice(), eventDTO.getText());
        eventRepository.save(event);

        for (byte[] m: eventDTO.getMedia()) {
            MediaContent mediaContent = new MediaContent(m, event.getId());
            mediaContentRepository.save(mediaContent);
        }
    }

    @Transactional
    public void delete(Long id, Long eventId){
        User user = userRepository.findUserById(id);
        Event event = eventRepository.findEventById(eventId);
        if(Objects.equals(id,event.getEventCoordinatorid()) || Objects.equals(user.getTypeOfUser(), "administrator") ){
            eventRepository.deleteEventById(eventId);
        }
        else{
            throw new UnAuthorizedException("Korisnik nije organizator događaja!");
        }

    }

    public List<EventPrintDTO> getInterests(Long userId, Integer option) {

        List<UserResponse> responses = userResponseRepository.findAllByUserid(userId);
        List<EventPrintDTO> eventsdto = new ArrayList<>();
        String status = switch (option) {
            case 0 -> "dolazim";
            case 1 -> "mozda";
            case 2 -> "ne dolazim";
            default -> "";
        };

        for (UserResponse u: responses) {
            if (Objects.equals(u.getStatus(), status)) {
                Event event = eventRepository.findEventById(u.getEventid());
                byte[] media = mediaContentRepository.getFirstByEventid(event.getId()).getContent();
                eventsdto.add(new EventPrintDTO(event.getId(), media, event.getEventName(), event.getTimeOfTheEvent(), event.getLocation()));
            }
        }

        return  eventsdto;
    }
}
