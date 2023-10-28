package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.user.controller.dto.RegisterForm;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;
import progi.project.eventovci.user.service.UserService;


@Controller
@RequestMapping("/changeData")

public class ChangeDataController {

    @Autowired
    private UserService userService;

    @PostMapping("/{id}")
    public ResponseEntity<User> changeData(@PathVariable Long id, @RequestBody RegisterForm registerform) {
        User user = userService.changeData(id, registerform.getUsername(), registerform.getEmail(), registerform.getPassword(),
                registerform.getTypeOfUser(), registerform.getHomeAdress(), registerform.getShouldPayMembership() );

        return ResponseEntity.ok(user);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(UserAlreadyExistsException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}