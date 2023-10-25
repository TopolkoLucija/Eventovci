package progi.project.eventovci.media.content.entity;


import jakarta.persistence.*;
import java.lang.Long;
import java.util.Objects;

@Entity
@Table(name="medijski_sadrzaj")
public class MediaContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_dogadjanja")
    private Long id;

    @Column(name="adresa_medijskog_sadrzaja")
    private String contentPath;

    @Column(name="id_dogadjanje")
    private Long event_id;

    //equals i hash za id

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MediaContent that = (MediaContent) o;
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

    public String getContentPath() {
        return contentPath;
    }

    public void setContentPath(String contentPath) {
        this.contentPath = contentPath;
    }

    public Long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Long event_id) {
        this.event_id = event_id;
    }
}
