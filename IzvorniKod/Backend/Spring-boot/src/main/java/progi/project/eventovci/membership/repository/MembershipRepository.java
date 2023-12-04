package progi.project.eventovci.membership.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.membership.entity.Membership;

import java.time.LocalDateTime;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Membership findByUserIdOrderByValidUntilDesc (Long userId);

    Membership findByMembershipId(Long id);

    @Modifying
    @Query("UPDATE Membership m SET m.validUntil = :validUntil WHERE m.userId = :id")
    Integer updateMembershipByUserId(@Param("id") Long id, @Param("validUntil") LocalDateTime validUntil);


}
