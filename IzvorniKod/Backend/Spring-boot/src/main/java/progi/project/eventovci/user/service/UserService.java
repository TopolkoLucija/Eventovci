package progi.project.eventovci.user.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.link.entity.SocialMediaLink;
import progi.project.eventovci.link.repository.LinkRepository;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.event.controller.dto.EventDataDTO;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.controller.dto.DataForm;
import progi.project.eventovci.user.controller.dto.AllUserDataForm;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;
import progi.project.eventovci.media.content.entity.repository.MediaContentRepository;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.repository.UserRepository;
import progi.project.eventovci.event.repository.EventRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private MediaContentRepository mediaContentRepository;

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    PasswordEncoder passwordEncoder;



    public User login(String username) {

        return userRepository.findUserByUsername(username);

    }

    public User register(String username, String email, String password, String typeOfUser, String homeAdress, Boolean shouldPayMembership) {
        User user = userRepository.findUserByEmail(email);
        if(user != null && Objects.equals(user.getEmail(), email)){
            throw new UserAlreadyExistsException("Neispravan email!");
        }
        user = userRepository.findUserByUsername(username);
        if(user != null && Objects.equals(user.getUsername(), username)) {
            throw new UserAlreadyExistsException("Neispravno korisničko ime!");
        }
        user = new User(username, email, passwordEncoder.encode(password), typeOfUser, homeAdress, shouldPayMembership);
        userRepository.save(user);
        return user;
    }

    public DataForm data(String username){
        User user = userRepository.findUserByUsername(username);
        if(user != null){
            Long id = user.getId();
            if(Objects.equals(user.getTypeOfUser(),"posjetitelj")){
                return new DataForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), user.getShouldPayMembership(), null, null);
            }
            if(Objects.equals(user.getTypeOfUser(),"administrator")){
                return new DataForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), user.getShouldPayMembership(), null, null);
            }
            if(Objects.equals(user.getTypeOfUser(),"organizator")){
                List<Event> event = eventRepository.findAllByEventCoordinatorid(id);
                List<EventDataDTO> eventlist = new ArrayList<>();
                for (Event e : event) {
                    MediaContent media = mediaContentRepository.first(e.getId()).get(0);
                    EventDataDTO eventDataDTO = new EventDataDTO(e.getEventName(), e.getLocation(),e.getTimeOfTheEvent(), media.getContent());
                    eventlist.add(eventDataDTO);
                }

                List<SocialMediaLink> socialMediaLinks = linkRepository.findAllByEventCoordinatorId(id);
                List<String> links = new ArrayList<>();
                for (SocialMediaLink s : socialMediaLinks) {
                    links.add(s.getLink());
                }

                return new DataForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), user.getShouldPayMembership(), eventlist, links);

            }
            return null;
        }else {
            throw new UserNotFoundException("Korisnik ne postoji!");
        }
    }

    @Transactional
    public void changeData(Long id, String username, String email, String homeAdress) {
        User user = userRepository.findUserById(id);
        if(user != null){

            userRepository.updateUserById(id, username, email, homeAdress);

        }else {
        throw new UserNotFoundException("Korisnik ne postoji!");
        }
    }

    public List<AllUserDataForm> allUsers(User user, Integer filter) {

        if (!Objects.equals(user.getTypeOfUser(), "administrator")){
            throw new UnAuthorizedException("Korisnik nije administrator!");
        }

        List<User> allUsers= userRepository.findAllUsers();
        List<AllUserDataForm> allUserDataForms = new ArrayList<>();

        for (User u : allUsers) {
            if ((filter == 1 && Objects.equals(u.getTypeOfUser(), "posjetitelj")) ||
                    (filter == 2 && Objects.equals(u.getTypeOfUser(), "organizator")) ||
                    filter == 0) {
                AllUserDataForm data = new AllUserDataForm(u.getId(), u.getUsername(), u.getEmail(), u.getTypeOfUser());
                allUserDataForms.add(data);
            }
        }
        return allUserDataForms;
    }

    @Transactional
    public void deleteMyProfile(Long id){
        User user = userRepository.findUserById(id);
        if(!Objects.equals(user.getTypeOfUser(), "administrator")){
            userRepository.deleteUserById(id);
        }
        else{
            throw new UnAuthorizedException("Nije moguće obrisati profil administratora!");
        }
    }

    @Transactional
    public void deleteUser(Long idAdmin, Long id){
        User admin = userRepository.findUserById(idAdmin);
        User user = userRepository.findUserById(id);
        if(user != null) {
            if (Objects.equals(user.getTypeOfUser(), "administrator") || Objects.equals(idAdmin, id) || !Objects.equals(admin.getTypeOfUser(), "administrator")) {
                throw new UnAuthorizedException("Nije moguće obrisati profil administratora!");
            } else {
                userRepository.deleteUserById(id);
            }
        }
        else{
            throw new UnAuthorizedException("Korisnik ne postoji!");
        }

    }



}
