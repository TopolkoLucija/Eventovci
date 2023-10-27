package progi.project.eventovci.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import progi.project.eventovci.user.controller.dto.DataForm;
import progi.project.eventovci.user.entity.UserNotFoundException;
import progi.project.eventovci.user.service.UserService;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/data")
public class DataController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<DataForm> data(@PathVariable Long id) {
        DataForm dataform = userService.data(id);
        return ResponseEntity.ok(dataform);
    }

    @ExceptionHandler()
    public ResponseEntity<String> handleException(UserNotFoundException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error occurred: " + ex.getMessage());
    }
}
