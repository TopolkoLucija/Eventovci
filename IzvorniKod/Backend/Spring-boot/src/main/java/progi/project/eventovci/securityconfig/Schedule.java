package progi.project.eventovci.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import progi.project.eventovci.subscription.repository.SubscriptionRepository;

@Service
public class Schedule {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Scheduled(fixedRate = 300000)
    public void schedule(){
        subscriptionRepository.findAll();
        System.out.println("Ping!!");
    }
}
