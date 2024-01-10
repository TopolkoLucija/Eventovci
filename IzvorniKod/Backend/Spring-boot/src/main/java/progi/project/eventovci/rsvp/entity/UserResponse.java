package progi.project.eventovci.rsvp.entity;

import jakarta.persistence.*;
import progi.project.eventovci.event.entity.Event;
import progi.project.eventovci.user.entity.User;

import java.lang.*;
import java.util.Objects;

@Entity
@Table(name="dolazakkorisnika")
public class UserResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="iddolaskakorisnika")
    private Long id;

    @Column(name="statusdolaska", nullable = false, length = 255)
    private String status; // OPCIJE: "dolazim", "mozda", "ne dolazim"

    @Column(name="iddogadjanja", nullable = false)
    private Long eventid;

    @Column(name="idkorisnik", nullable = false)
    private Long userid;


     @ManyToOne
     @JoinColumn(name = "iddogadjanja", insertable = false, updatable = false)
     private Event event;

     @ManyToOne
     @JoinColumn(name = "idkorisnik", insertable = false, updatable = false)
     private User user;


    //konstruktor

    public UserResponse() {

    }


    public UserResponse(String status, Long eventid, Long userid) {
        this.status = status;
        this.eventid = eventid;
        this.userid = userid;
    }

    //equals i hash za id
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse that = (UserResponse) o;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getEventid() {
        return eventid;
    }

    public void setEventid(Long event_id) {
        this.eventid = eventid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long user_id) {
        this.userid = user_id;
    }
}
