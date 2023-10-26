package progi.project.eventovci.membership.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name="clanarina")
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_clanarine")
    private Long membershipId;

    @Column(name="id_korisnik")
    private Long user_id;

    @Column(name="cijena_clanarine")
    private Double price;

    @Column(name="vrijedi_do")
    private LocalDateTime validUntil;

    //konstruktori
    public Membership() {

    }

    public Membership(Long user_id, Double price, LocalDateTime validUntil) {
        this.user_id = user_id;
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

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
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
