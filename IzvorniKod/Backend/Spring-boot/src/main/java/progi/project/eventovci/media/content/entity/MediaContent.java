package progi.project.eventovci.media.content.entity;


import jakarta.persistence.*;
import java.lang.Long;
import java.util.Objects;

@Entity
@Table(name="medijskisadrzaj")
public class MediaContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idmedijskogsadrzaja")
    private Long id;

    @Column(name="adresamedijskogsadrzaja")
    private String contentPath;

    @Column(name="iddogadjanja")
    private Long eventid;

    //konstruktor
    public MediaContent() {

    }
    public MediaContent(String contentPath, Long eventid) {
        this.contentPath = contentPath;
        this.eventid = eventid;
    }

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
        return eventid;
    }

    public void setEvent_id(Long eventid) {
        this.eventid = eventid;
    }
}
