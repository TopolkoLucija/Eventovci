package progi.project.eventovci.membership.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.membership.entity.Membership;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Membership findByUserIdOrderByValidUntilDesc (Long userId);

    Membership findByMembershipId(Long id);

}
