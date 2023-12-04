package progi.project.eventovci.membership.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.membership.repository.MembershipRepository;
import progi.project.eventovci.user.controller.dto.UnAuthorizedException;
import progi.project.eventovci.user.entity.User;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class MembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

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
            membershipRepository.updateMembershipByUserId(id, newValidUntil);
        }
        else{
            throw new UnAuthorizedException("Plaćanje nije uspjelo!");
        }
    }

}
