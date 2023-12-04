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

    @Column(name="medijskisadrzaj")
    private byte[] content;

    @Column(name="iddogadjanja")
    private Long eventid;

    //konstruktor
    public MediaContent() {

    }

    public MediaContent(byte[] content, Long eventid) {
        this.content = content;
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

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public Long getEventid() {
        return eventid;
    }

    public void setEventid(Long eventid) {
        this.eventid = eventid;
    }
}
