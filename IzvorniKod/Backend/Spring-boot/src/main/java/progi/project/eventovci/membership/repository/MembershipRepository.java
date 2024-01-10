package progi.project.eventovci.membership.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import progi.project.eventovci.membership.entity.Membership;
import progi.project.eventovci.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Membership findByUserIdOrderByValidUntilDesc (Long userId);

    Membership findByMembershipId(Long id);

    @Modifying
    @Query("UPDATE Membership m SET m.price = :price, m.validUntil = :validUntil WHERE m.userId = :id")
    Integer updateMembershipByUserId(@Param("id") Long id, @Param("price") Double price, @Param("validUntil") LocalDateTime validUntil);

    @Query("SELECT m FROM Membership m")
    List<Membership> findAllMemberships();
}
