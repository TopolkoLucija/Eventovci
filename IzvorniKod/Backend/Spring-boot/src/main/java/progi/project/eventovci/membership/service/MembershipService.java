package progi.project.eventovci.membership.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.membership.repository.MembershipRepository;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Service
public class MembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private UserRepository userRepository;

    public Double getPrice(Long id) {
        Membership membership = membershipRepository.findByUserIdOrderByValidUntilDesc(id);
        return membership.getPrice();
    }

    @Transactional
    public void payMembership(Long id) {
        int randomNumber = (int) (Math.random() * 10);
        if(!(randomNumber == 8)){
            Membership membership = membershipRepository.findByUserIdOrderByValidUntilDesc(id);
            LocalDateTime currentDateTime = LocalDateTime.now();
            LocalDateTime newValidUntil = currentDateTime.plus(1, ChronoUnit.MONTHS);
            membershipRepository.updateMembershipByUserId(id, membership.getPrice(), newValidUntil);
        }
        else{
            throw new UnAuthorizedException("Plaćanje nije uspjelo!");
        }
    }

    @Transactional
    public void changePrice(Long id, Double price) {
        User user = userRepository.findUserById(id);
        if(Objects.equals(user.getTypeOfUser(), "administrator")){
            List<Membership> allMemberships = membershipRepository.findAllMemberships();
            for (Membership m : allMemberships){
                membershipRepository.updateMembershipByUserId(m.getUserId(), price, m.getValidUntil());
            }
        }
        else{
            throw new UnAuthorizedException("Samo administrator može mjenjati cijenu članarine!");
        }
    }

}
