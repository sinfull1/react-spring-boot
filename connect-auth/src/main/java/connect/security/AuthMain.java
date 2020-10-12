package connect.security;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@SpringBootApplication


public class AuthMain {

    public static void main(String[] args) {
        SpringApplication.run(AuthMain.class, args);
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
}
