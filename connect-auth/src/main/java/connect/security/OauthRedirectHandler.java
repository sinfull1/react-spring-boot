package connect.security;

import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.URI;

public class OauthRedirectHandler<T> implements HandlerFunction<ServerResponse> {


    @Override
    public Mono<ServerResponse> handle(ServerRequest serverRequest) {

        Mono<AuthCodeRequest> auth = serverRequest.bodyToMono(String.class).flatMap(
                request -> Mono.just(AuthCodeRequest.getAuthCodeObject(request)));
        return auth.flatMap(
                a -> {
                    AuthRequest authRequest = new AuthRequest();
                    authRequest.setPassword(a.getScope());
                    authRequest.setUsername(a.getClient_id());
                    return ServerResponse.permanentRedirect(URI.create("http://lcoalhost:8080/login"))
                            .body(BodyInserters.fromPublisher(Mono.just(authRequest),AuthRequest.class));
                });

    }
}
