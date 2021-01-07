package connect.config;


import connect.service.AuthzFilter;
import connect.service.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityWebFilterChain springWebFilterChain(ServerHttpSecurity http,
                                                JwtUtils jwtUtils
                                               ) {
        final String PATH_POSTS = "/posts/**";

        return http.csrf().disable()
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
                .authorizeExchange(it -> it
                        .anyExchange().permitAll()
                ).redirectToHttps().and()

                .addFilterAt(new AuthzFilter(jwtUtils), SecurityWebFiltersOrder.HTTP_BASIC)
                .build();


    }







}
