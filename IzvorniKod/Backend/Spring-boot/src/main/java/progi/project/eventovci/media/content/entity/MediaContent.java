package progi.project.eventovci.media.content.entity;


import jakarta.persistence.*;
import org.hibernate.validator.constraints.URL;
import progi.project.eventovci.event.entity.Event;

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
    private String content;

    @Column(name="vrsta", length = 10)
    private String type;
    @Column(name="iddogadjanja")
    private Long eventid;


     @ManyToOne
     @JoinColumn(name = "iddogadjanja", insertable = false, updatable = false)
     private Event event;


    //konstruktor
    public MediaContent() {

    }

    public MediaContent(String content, String type, Long eventid) {
        this.content = content;
        this.type = type;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getEventid() {
        return eventid;
    }

    public void setEventid(Long eventid) {
        this.eventid = eventid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
