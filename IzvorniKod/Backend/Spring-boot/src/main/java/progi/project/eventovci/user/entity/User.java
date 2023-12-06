package progi.project.eventovci.user.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="korisnik")
public class User{

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="korisnickoime")
    private String username;

    @Column(name="email")
    private String email;
    @Column(name="lozinka")
    private String password;
    @Column(name="tipkorisnika")
    private String typeOfUser; //posjetitelj, organizator, administrator
    @Column(name="adresa")
    private String homeAdress;

    //konstruktor
    public User(){

    }

    public User(String username, String email, String password, String typeOfUser, String homeAdress) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.typeOfUser = typeOfUser;
        this.homeAdress = homeAdress;
    }

    public User(Long id, String username, String email, String password, String typeOfUser, String homeAdress) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.typeOfUser = typeOfUser;
        this.homeAdress = homeAdress;
    }

    //equals i hashcode za id
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(typeOfUser, user.typeOfUser) && Objects.equals(homeAdress, user.homeAdress);
    }


    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //geteri i seteti


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTypeOfUser() {
        return typeOfUser;
    }

    public void setTypeOfUser(String typeOfUser) {
        this.typeOfUser = typeOfUser;
    }

    public String getHomeAdress() {
        return homeAdress;
    }

    public void setHomeAdress(String homeAdress) {
        this.homeAdress = homeAdress;
    }
}
