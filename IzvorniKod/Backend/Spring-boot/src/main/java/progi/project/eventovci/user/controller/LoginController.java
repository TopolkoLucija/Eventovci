package progi.project.eventovci.user.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.repository.MediaContentRepository;
import progi.project.eventovci.securityconfig.JWTGenerator;
import progi.project.eventovci.user.controller.dto.LoginForm;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.service.UserService;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Base64;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping()
    public ResponseEntity<String> login(@RequestBody LoginForm loginform) throws IOException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginform.getUsername(), loginform.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        String username = jwtGenerator.getUsernameFromJWT(token);

        User user = userService.login(username);

        return ResponseEntity.ok(token);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(AuthenticationException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}