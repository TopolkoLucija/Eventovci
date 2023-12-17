package progi.project.eventovci.event.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.event.controller.dto.AddEventDTO;
import progi.project.eventovci.event.controller.dto.EventInfoDTO;
import progi.project.eventovci.event.controller.dto.EventPrintDTO;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.event.repository.EventRepository;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.repository.MediaContentRepository;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.membership.repository.MembershipRepository;
import progi.project.eventovci.rsvp.entity.UserResponse;
import progi.project.eventovci.rsvp.repository.UserResponseRepository;
import progi.project.eventovci.subscription.entity.Subscription;
import progi.project.eventovci.subscription.repository.SubscriptionRepository;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.repository.UserRepository;
import progi.project.eventovci.membership.controller.dto.NoMembershipException;

import java.time.LocalDateTime;
import java.util.*;

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

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public Event add(User user, AddEventDTO eventDTO) {

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
        return event;
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
                String media = null;
                String type = null;
                MediaContent mc = mediaContentRepository.findFirstByEventidAndType(event.getId(), "image");
                if (mc!=null) {
                    media = mc.getContent();
                    type = mc.getType();
                }
                eventsdto.add(new EventPrintDTO(event.getId(), media, type, event.getEventName(), event.getTimeOfTheEvent(), event.getLocation()));
            }

        }

        return  eventsdto;
    }

    public List<EventPrintDTO> getInbox(Long userId) {

        List<Subscription> subscriptions = subscriptionRepository.findAllByUserid(userId);
        Set<EventPrintDTO> eventsdto = new HashSet<>();

        Set<Event> events = new TreeSet<>(Comparator.comparing(Event::getTimeOfTheEvent));

        for (Subscription u: subscriptions) {
                if (u.getCategory()!=null) {
                    Set<Event> events1 = eventRepository.findAllByTypeOfEventAndTimeOfTheEventAfter(u.getCategory(), LocalDateTime.now());
                    events.addAll(events1);
                }
                if (u.getLocation()!=null) {
                    Set<Event> events2 = eventRepository.findAllByLocationAndTimeOfTheEventAfter(u.getLocation(), LocalDateTime.now());
                    events.addAll(events2);
                }

        }

        for (Event e : events) {
            String media = null;
            String type = null;
            MediaContent mc = mediaContentRepository.findFirstByEventidAndType(e.getId(), "image");
            if (mc!=null) {
                media = mc.getContent();
                type = mc.getType();
            }
            eventsdto.add(new EventPrintDTO(e.getId(), media, type, e.getEventName(), e.getTimeOfTheEvent(), e.getLocation()));
        }

        return new ArrayList<>(eventsdto);
    }

    public List<EventPrintDTO> getEvents(Integer time) {
        List<EventPrintDTO> eventsdto = new ArrayList<>();
        List<Event> events = new ArrayList<>();

        if (time == 0) {
            events = eventRepository.findAllByTimeOfTheEventAfter(LocalDateTime.now());
        }
        if (time == 48) {
            events = eventRepository.findAllByTimeOfTheEventIsBetween(LocalDateTime.now().minusSeconds(48 * 60 * 60), LocalDateTime.now());
        }
        if (time != 0 && time != 48) {
            LocalDateTime until = switch (time) {
                case 24 -> LocalDateTime.now().plusSeconds(24 * 60 * 60);
                case 7 -> LocalDateTime.now().plusSeconds(7 * 24 * 60 * 60);
                case 30 -> LocalDateTime.now().plusSeconds(30 * 24 * 60 * 60);
                default -> LocalDateTime.now();
            };

            events = eventRepository.findAllByTimeOfTheEventIsBetween(LocalDateTime.now(), until);
        }
        for (Event e : events) {
            String media = null;
            String type = null;
            MediaContent mc = mediaContentRepository.findFirstByEventidAndType(e.getId(), "image");
            if (mc!=null) {
                media = mc.getContent();
                type = mc.getType();
            }
            eventsdto.add(new EventPrintDTO(e.getId(), media, type, e.getEventName(), e.getTimeOfTheEvent(), e.getLocation()));
        }

        return eventsdto;
    }
    public EventInfoDTO getInfo(Long id) {
        Event event = eventRepository.findEventById(id);
        User user = userRepository.findUserById(event.getEventCoordinatorid());
        return new EventInfoDTO(event.getEventName(), event.getTypeOfEvent(), event.getLocation(), event.getTimeOfTheEvent(), event.getDuration(), event.getTicketPrice(), event.getEventCoordinatorid(), user.getUsername());
    }

    public List<EventPrintDTO> getMyEvents(Long userId) {
        List<EventPrintDTO> eventsdto = new ArrayList<>();
        List<Event> events = eventRepository.findAllByTimeOfTheEventAfterAndEventCoordinatorid(LocalDateTime.now(), userId);

        for (Event e : events) {
            String media = null;
            String type = null;
            MediaContent mc = mediaContentRepository.findFirstByEventidAndType(e.getId(), "image");
            if (mc!=null) {
                media = mc.getContent();
                type = mc.getType();
            }
            eventsdto.add(new EventPrintDTO(e.getId(), media, type, e.getEventName(), e.getTimeOfTheEvent(), e.getLocation()));
        }

        return eventsdto;
    }

    public List<EventPrintDTO> getMyOldEvents(Long userId) {
        List<EventPrintDTO> eventsdto = new ArrayList<>();
        List<Event> events = eventRepository.findAllByTimeOfTheEventBeforeAndEventCoordinatorid(LocalDateTime.now(), userId);

        for (Event e : events) {
            String media = null;
            String type = null;
            MediaContent mc = mediaContentRepository.findFirstByEventidAndType(e.getId(), "image");
            if (mc!=null) {
                media = mc.getContent();
                type = mc.getType();
            }
            eventsdto.add(new EventPrintDTO(e.getId(), media, type, e.getEventName(), e.getTimeOfTheEvent(), e.getLocation()));
        }

        return eventsdto;
    }
}
