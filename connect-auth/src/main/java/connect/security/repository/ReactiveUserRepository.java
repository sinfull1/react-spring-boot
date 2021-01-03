package connect.security.repository;

import connect.security.AuthRequest;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface ReactiveUserRepository extends ReactiveCrudRepository<Credential, Integer> {


    @Query("SELECT username,password FROM credential where username= $1")
    Mono<AuthRequest> findByUserName(String username);

}


