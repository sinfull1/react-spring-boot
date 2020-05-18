package connect.security;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"connect.security"})

public class AuthMain {

    public static void main(String[] args) {
        SpringApplication.run(AuthMain.class, args);
    }

}
