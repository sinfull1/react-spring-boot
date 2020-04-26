package connect.connectserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = {"connect.controllers", "connect.service", "connect.security", "connect.utils"})

public class ConnectServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConnectServerApplication.class, args);
    }

    @Configuration
    @EnableWebFlux
    public class CorsGlobalConfiguration implements WebFluxConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry corsRegistry) {
            corsRegistry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("PUT,GET")
                    .maxAge(3600);
        }
    }

    // Todo
    // Implement https://medium.com/@ard333/authentication-and-authorization-using-jwt-on-spring-webflux-29b81f813e78

}
