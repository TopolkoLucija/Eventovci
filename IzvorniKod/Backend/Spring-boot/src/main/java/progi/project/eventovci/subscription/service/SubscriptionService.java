package progi.project.eventovci.subscription.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.subscription.controller.dto.MySubscriptionsDTO;
import progi.project.eventovci.subscription.entity.Subscription;
import progi.project.eventovci.subscription.repository.SubscriptionRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public List<MySubscriptionsDTO> get(Long userId) {
        List<Subscription> subscriptions = subscriptionRepository.findAllByUserid(userId);
        List<MySubscriptionsDTO> mySubscriptionsDTOS = new ArrayList<>();
        for (Subscription s : subscriptions) {
            mySubscriptionsDTOS.add(new MySubscriptionsDTO(s.getCategory(), s.getLocation()));
        }
        return mySubscriptionsDTOS;
    }
}
