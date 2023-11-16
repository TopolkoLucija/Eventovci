package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.securityconfig.JWTGenerator;
import progi.project.eventovci.user.controller.dto.RegisterForm;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.service.UserService;

@RestController
@RequestMapping ("/register")
public class RegisterController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping()
    public ResponseEntity<String> register(@RequestBody RegisterForm registerform) {
        User user = userService.register(registerform.getUsername(), registerform.getEmail(), registerform.getPassword(),
        registerform.getTypeOfUser(), registerform.getHomeAdress(), registerform.getShouldPayMembership() );

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(registerform.getUsername(), registerform.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        return ResponseEntity.ok(token);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(AuthenticationException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}