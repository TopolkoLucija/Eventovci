package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import progi.project.eventovci.user.controller.dto.RegisterForm;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserAlreadyExistsException;
import progi.project.eventovci.user.service.UserService;

@Controller
@RequestMapping ("/register")

public class RegisterController {

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<User> register(@RequestBody RegisterForm registerform) {
        User user = userService.register(registerform.getUsername(), registerform.getEmail(), registerform.getPassword(),
        registerform.getTypeOfUser(), registerform.getHomeAdress(), registerform.getShouldPayMembership() );

        return ResponseEntity.ok(user);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(UserAlreadyExistsException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}