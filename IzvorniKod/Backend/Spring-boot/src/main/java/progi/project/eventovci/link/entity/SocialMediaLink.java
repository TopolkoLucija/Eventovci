package progi.project.eventovci.link.entity;

import jakarta.persistence.*;
import progi.project.eventovci.user.entity.User;

import java.lang.Long;
import java.util.Objects;

@Entity
@Table(name="poveznica")
public class SocialMediaLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idpoveznice")
    private Long id;

    @Column(name="organizatorid", nullable = false)
    private Long eventCoordinatorId;

    @Column(name="link", nullable = false, length = 255)
    private String link;


     @ManyToOne
     @JoinColumn(name = "organizatorid", insertable = false, updatable = false)
     private User eventCoordinator;



    //konstruktor
    public SocialMediaLink() {

    }


    public SocialMediaLink(Long eventCoordinator_id, String link) {
        this.eventCoordinatorId = eventCoordinator_id;
        this.link = link;
    }

    //equals i hash za id
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SocialMediaLink that = (SocialMediaLink) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //geteri i seteri
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventCoordinatorId() {
        return eventCoordinatorId;
    }

    public void setEventCoordinatorId(Long eventCoordinatorId) {
        this.eventCoordinatorId = eventCoordinatorId;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
