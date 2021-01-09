package connect.service;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuthzFilter implements WebFilter {

    public static final String HEADER_PREFIX = "Bearer ";

    private final JwtUtils jwtUtils;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String token = resolveToken(exchange.getRequest());
        System.out.println(token);
        if (exchange.getRequest().getMethod().equals(HttpMethod.OPTIONS)) {
            System.out.println("prefilght");
            return chain.filter(exchange);
        }
        if (exchange.getRequest().getHeaders().get("accept").get(0).equals("text/event-stream"))
        {
            System.out.println("text stream");
            return chain.filter(exchange);

        }

        if (StringUtils.hasText(token) && jwtUtils.validateToken(token)) {
            Authentication authentication = jwtUtils.getAuthentication(token);
            return chain.filter(exchange).contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
        }
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return chain.filter(exchange);
    }

    private String resolveToken(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(HEADER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
