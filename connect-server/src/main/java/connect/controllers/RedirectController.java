package connect.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

    @Controller
    public class RedirectController {
        @RequestMapping(value = {"/", "/home", "/login"})
        public String index() {
            return "index";
        }
    }


