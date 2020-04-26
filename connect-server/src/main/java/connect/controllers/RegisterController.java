package connect.controllers;

import connect.dao.UserDao;
import connect.security.JwtInMemoryUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

public class RegisterController {

    @Autowired
    private JwtInMemoryUserDetailsService jwtInMemoryUserDetailsService;


    @PostMapping("/register")
    public String showRegistrationForm(UserDao userDao) {
        if (jwtInMemoryUserDetailsService.registerUser(userDao))
        {
            return "Registration Successful";
        }
        else{
            return "Registration unSuccessful";
        }
    }
}
