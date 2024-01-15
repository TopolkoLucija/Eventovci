package progi.project.eventovci.subscription.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import progi.project.eventovci.user.entity.User;

import java.util.Objects;

@Entity
@Table(name="pretplata")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idpretplata")
    private Long subscriptionid;

    @Column(name="kategorija", length = 255)
    private String category;

    @Column(name="lokacija", length = 255)
    private String location;

    @Column(name="idkorisnik", nullable = false)
    private Long userid;


     @ManyToOne
     @OnDelete(action = OnDeleteAction.CASCADE)
     @JoinColumn(name = "idkorisnik", insertable = false, updatable = false)
     private User user;


    //konstruktori
    public Subscription() {

    }

    public Subscription(String category, String location, Long userid) {
        this.category = category;
        this.location = location;
        this.userid = userid;
    }

    //equals i hash za id pretplate

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Subscription that = (Subscription) o;
        return Objects.equals(subscriptionid, that.subscriptionid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(subscriptionid);
    }

    //geteri i seteri


    public Long getSubscriptionid() {
        return subscriptionid;
    }

    public void setSubscriptionid(Long subscriptionid) {
        this.subscriptionid = subscriptionid;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }
}
