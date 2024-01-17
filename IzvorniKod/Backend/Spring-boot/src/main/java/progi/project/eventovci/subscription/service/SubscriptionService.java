package progi.project.eventovci.subscription.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.project.eventovci.subscription.controller.dto.AddSubscriptionDTO;
import progi.project.eventovci.subscription.controller.dto.MySubscriptionsDTO;
import progi.project.eventovci.subscription.entity.Subscription;
import progi.project.eventovci.subscription.repository.SubscriptionRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public void add(Long userId, List<String> types, List<String> locations) {
        List<Subscription> subscriptions = subscriptionRepository.findAllByUserid(userId);
        List<String> oldTypes = new ArrayList<>();
        List<String> oldLocations = new ArrayList<>();
        for (Subscription subscription : subscriptions) {
            if (subscription.getLocation()!=null) {
                oldLocations.add(subscription.getLocation());
                if (!locations.contains(subscription.getLocation())){
                    subscriptionRepository.delete(subscription);
                }
            }
            if (subscription.getCategory()!=null) {
                oldTypes.add(subscription.getCategory());
                if (!types.contains(subscription.getCategory())){
                    subscriptionRepository.delete(subscription);
                }
            }
        }
        for (String type : types) {
            if (!oldTypes.contains(type)) {
                subscriptionRepository.save(new Subscription(type, null, userId));
            }
        }
        for (String location : locations) {
            if (!oldLocations.contains(location)) {
                subscriptionRepository.save(new Subscription(null, location, userId));
            }
        }
    }
}
