package progi.project.eventovci.membership.entity;

import jakarta.persistence.*;
import progi.project.eventovci.user.entity.User;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name="clanarina")
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idclanarine")
    private Long membershipId;

    @Column(name="idkorisnik", nullable = false)
    private Long userId;

    @Column(name="cijenaclanarine", nullable = false)
    private Double price;

    @Column(name="vrijedido", nullable = false)
    private LocalDateTime validUntil;


     @ManyToOne
     @JoinColumn(name = "idkorisnik", insertable = false, updatable = false)
     private User user;


    //konstruktori
    public Membership() {

    }

    public Membership(Long userId, Double price, LocalDateTime validUntil) {
        this.userId = userId;
        this.price = price;
        this.validUntil = validUntil;
    }

    //equals i hash za id


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Membership that = (Membership) o;
        return Objects.equals(membershipId, that.membershipId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(membershipId);
    }

    //geteri i seteri

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDateTime getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDateTime validUntil) {
        this.validUntil = validUntil;
    }
}
