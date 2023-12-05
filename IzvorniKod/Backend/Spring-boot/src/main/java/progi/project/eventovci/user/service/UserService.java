package progi.project.eventovci.user.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import progi.project.eventovci.event.controller.dto.EventPrintDTO;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.link.entity.SocialMediaLink;
import progi.project.eventovci.link.repository.LinkRepository;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.membership.repository.MembershipRepository;
import progi.project.eventovci.user.controller.dto.ProfileForm;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.controller.dto.DataForm;
import progi.project.eventovci.user.controller.dto.AllUserDataForm;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;
import progi.project.eventovci.media.content.entity.repository.MediaContentRepository;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.repository.UserRepository;
import progi.project.eventovci.event.repository.EventRepository;

import java.time.LocalDateTime;
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
    private MembershipRepository membershipRepository;

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
        if (Objects.equals(typeOfUser, "organizator")) {
            Long a = (long) 1.0;
            Double price = membershipRepository.findByMembershipId(a).getPrice();
            Membership membership = new Membership(user.getId(), price, LocalDateTime.MIN);
            membershipRepository.save(membership);
        }
        return user;
    }

    public ProfileForm data(String username){
        User user = userRepository.findUserByUsername(username);
        if(user != null){
            Long id = user.getId();
            if(Objects.equals(user.getTypeOfUser(),"posjetitelj")){
                return new ProfileForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), null);
            }
            if(Objects.equals(user.getTypeOfUser(),"administrator")){
                return new ProfileForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), null);
            }
            if(Objects.equals(user.getTypeOfUser(),"organizator")){
                Membership membership = membershipRepository.findByUserIdOrderByValidUntilDesc(user.getId());
                if(membership != null) {
                    return new ProfileForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), membership.getValidUntil());
                }
                else{
                    return new ProfileForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), null);
                }
            }
            return null;
        }else {
            throw new UserNotFoundException("Korisnik ne postoji!");
        }
    }

    public DataForm dataOrg(Long id){
        User user = userRepository.findUserById(id);
        if(user != null && Objects.equals(user.getTypeOfUser(), "organizator")){
            List<Event> event = eventRepository.findAllByEventCoordinatorid(id);
            List<EventPrintDTO> eventlist = new ArrayList<>();
            for (Event e : event) {
                List<MediaContent> mc = mediaContentRepository.getAllByEventid(e.getId());
                String media = null;
                String type = null;
                for (int i = mc.size()-1; i>0; i--) {
                    if (Objects.equals(mc.get(i).getType(), "image")){
                        media = mc.get(i).getContent();
                        type = mc.get(i).getType();
                    }
                }
                eventlist.add(new EventPrintDTO(e.getId(), media, type, e.getEventName(), e.getTimeOfTheEvent(), e.getLocation()));

            }

            List<SocialMediaLink> socialMediaLinks = linkRepository.findAllByEventCoordinatorId(id);
            List<String> links = new ArrayList<>();
            for (SocialMediaLink s : socialMediaLinks) {
                links.add(s.getLink());
            }

            return new DataForm(user.getUsername(), user.getEmail(), user.getTypeOfUser(), user.getHomeAdress(), user.getShouldPayMembership(), eventlist, links);

        }
        else {
            throw new UserNotFoundException("Korisnik nije organizator!");
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
