package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.securityconfig.JWTGenerator;
import progi.project.eventovci.securityconfig.auth.Convert;
import progi.project.eventovci.user.controller.dto.ChangeDataForm;
import progi.project.eventovci.user.controller.dto.DataForm;
import progi.project.eventovci.user.controller.dto.AllUserDataForm;
import progi.project.eventovci.user.controller.dto.RegisterForm;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.service.UserService;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private UserService userService;

    @Autowired
    Convert convert;

    @GetMapping()
    public ResponseEntity<DataForm> data(@RequestHeader("Authorization") String token) {
        DataForm dataform = userService.data(convert.convertToUsername(token));
        return ResponseEntity.ok(dataform);
    }

    @PostMapping("/change")
    public ResponseEntity<Void> changeData(@RequestHeader("Authorization") String token, @RequestBody ChangeDataForm changedataform) {
        userService.changeData(convert.convertToId(token), changedataform.getUsername(), changedataform.getEmail(),
                changedataform.getHomeAdress());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<AllUserDataForm>> allUsers() {
        List<AllUserDataForm> data = userService.allUsers();
        return ResponseEntity.ok(data);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(UserNotFoundException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}
