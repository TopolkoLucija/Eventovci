package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.user.controller.dto.LoginForm;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.service.UserService;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<User> login(@RequestBody LoginForm loginform) {
        User user = userService.login(loginform.getEmail(), loginform.getPassword());
        return ResponseEntity.ok(user);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(UserNotFoundException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}