package connect.connectserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.Http11NioProtocol;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.cache.CachesEndpointAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatReactiveWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;

import java.io.File;
import java.io.IOException;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@SpringBootApplication(exclude = {CachesEndpointAutoConfiguration.class})
@EnableCaching

@EnableWebFlux
@ComponentScan(basePackages = {"connect"})
public class ConnectServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConnectServerApplication.class, args);
    }

    @Configuration


    public class CorsGlobalConfiguration implements WebFluxConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry corsRegistry) {
            corsRegistry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("PUT,GET")
                    .maxAge(3600);
        }
    }

    @Bean
    public RouterFunction<ServerResponse> htmlRouter(
            @Value("classpath:/public/index.html") Resource html) {
        return route(GET("/"), request
                -> ok().contentType(MediaType.TEXT_HTML).syncBody(html)
        );
    }

    @Bean
    public RouterFunction<ServerResponse> htmlHomeRouter(
            @Value("classpath:/public/index.html") Resource html) {
        return route(GET("/home"), request
                -> ok().contentType(MediaType.TEXT_HTML).syncBody(html)
        );
    }

    @Bean
    public RouterFunction<ServerResponse> htmlLoginRouter(
            @Value("classpath:/public/index.html") Resource html) {
        return route(GET("/login"), request
                -> ok().contentType(MediaType.TEXT_HTML).syncBody(html)
        );
    }


    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        MappingJackson2HttpMessageConverter converter =
                new MappingJackson2HttpMessageConverter(mapper);
        return converter;
    }

    @Bean
    RouterFunction<ServerResponse> staticResourceRouter() {
        return RouterFunctions.resources("/**", new ClassPathResource("public/"));
    }
    // Todo
    // Implement https://medium.com/@ard333/authentication-and-authorization-using-jwt-on-spring-webflux-29b81f813e78

    @Bean

    public Flux<String> getSubs() {
        return Flux.just("tty");
    }
   /* @Configuration
    @EnableSpringWebSession
    public class SessionConfig {

        @Bean
        public ReactiveSessionRepository reactiveSessionRepository() {
            return new ReactiveMapSessionRepository(new ConcurrentHashMap<>());
        }
    }*/

}
