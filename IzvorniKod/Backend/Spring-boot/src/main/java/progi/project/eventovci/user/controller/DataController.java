package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.event.controller.dto.IdFilter;
import progi.project.eventovci.securityconfig.JWTGenerator;
import progi.project.eventovci.securityconfig.auth.Convert;
import progi.project.eventovci.user.controller.dto.*;
import progi.project.eventovci.user.entity.User;
import progi.project.eventovci.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private UserService userService;

    @Autowired
    Convert convert;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTGenerator jwtGenerator;

    @GetMapping()
    public ResponseEntity<ProfileForm> data(@RequestHeader("Authorization") String token) {
        ProfileForm profileForm = userService.data(convert.convertToUsername(token));
        return ResponseEntity.ok(profileForm);
    }

    @GetMapping("/getOrg/{filter}")
    public ResponseEntity<DataForm> dataOrg(@RequestHeader("Authorization") String token, @PathVariable Long filter) {
        DataForm dataform = userService.dataOrg(filter);
        return ResponseEntity.ok(dataform);
    }

    @PostMapping("/change")
    public ResponseEntity<String> changeData(@RequestHeader("Authorization") String token, @RequestBody ChangeDataForm changedataform) {
        User user = convert.convertToUser(token);

        userService.changeData(convert.convertToId(token), changedataform.getUsername(), changedataform.getEmail(),
                changedataform.getHomeAdress());

        Long id = user.getId();

        User newUser = userService.get(id);


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(newUser.getUsername(), newUser.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String newToken = jwtGenerator.generateToken(authentication);

        return ResponseEntity.ok(newToken);
    }

    @GetMapping("/allUsers/{filter}")
    public ResponseEntity<List<AllUserDataForm>> allUsers(@RequestHeader("Authorization") String token, @PathVariable Integer filter) {
        List<AllUserDataForm> data = userService.allUsers(convert.convertToUser(token), filter);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/type")
    public ResponseEntity<String> getType(@RequestHeader("Authorization") String token) {
        User user = convert.convertToUser(token);
        return ResponseEntity.ok(user.getTypeOfUser());
    }

    @DeleteMapping("/deleteMyProfile")
    public ResponseEntity<Void> deleteMyProfile(@RequestHeader("Authorization") String token){
        userService.deleteMyProfile(convert.convertToId(token));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{filter}")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String token, @PathVariable Long filter){
        userService.deleteUser(convert.convertToId(token), filter);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(RuntimeException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}
