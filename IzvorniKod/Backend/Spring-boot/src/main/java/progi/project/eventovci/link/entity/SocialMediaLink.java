package progi.project.eventovci.link.entity;

import jakarta.persistence.*;
import java.lang.Long;
import java.util.Objects;

@Entity
@Table(name="poveznica")
public class SocialMediaLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_dogadjanja")
    private Long id;

    @Column(name="organizator_id")
    private Long eventCoordinator_id;

    @Column(name="link")
    private String link;

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

    public Long getEventCoordinator_id() {
        return eventCoordinator_id;
    }

    public void setEventCoordinator_id(Long eventCoordinator_id) {
        this.eventCoordinator_id = eventCoordinator_id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
