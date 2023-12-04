package progi.project.eventovci.subscription.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import progi.project.eventovci.subscription.entity.Subscription;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findAllByUserid(Long userid);

}
