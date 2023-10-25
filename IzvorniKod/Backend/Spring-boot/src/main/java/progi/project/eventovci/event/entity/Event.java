package progi.project.eventovci.event.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.lang.Long;


@Entity
@Table(name="dogadjanje")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_dogadjanja")
    private Long id;

    @Column(name="naziv_dogadjanja")
    private String eventName;

    @Column(name="tip dogadjanja")
    private String typeOfEvenet;

    @Column(name="lokacija_dogadjanja")
    private String Location;

    @Column(name="datum_dogadjanja")
    private LocalDate dateOfTheEvent;

    @Column(name="vrijeme_dogadjanja")
    private LocalTime timeOfTheEvent;

    @Column(name="trajanje")
    private String duration;

    @Column(name="organizator_id")
    private Long eventCoordinator_id;

    @Column(name="placanje_ulaznice")
    private Boolean shouldPayTicket;//true - treba platiti, false - ne treba platiti


    //konstruktor

    public Event(String eventName, String typeOfEvenet, String location, LocalDate dateOfTheEvent, LocalTime timeOfTheEvent, String duration, Long eventCoordinator_id, Boolean shouldPayTicket) {
        this.eventName = eventName;
        this.typeOfEvenet = typeOfEvenet;
        Location = location;
        this.dateOfTheEvent = dateOfTheEvent;
        this.timeOfTheEvent = timeOfTheEvent;
        this.duration = duration;
        this.eventCoordinator_id = eventCoordinator_id;
        this.shouldPayTicket = shouldPayTicket;
    }


    //equals i hash za id

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
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
}
