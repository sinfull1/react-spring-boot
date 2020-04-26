package connect.connectserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@ComponentScan(basePackages = {"connect.controllers", "connect.service", "connect.security", "connect.utils"})
@EnableWebSecurity

public class ConnectServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConnectServerApplication.class, args);
    }



}
