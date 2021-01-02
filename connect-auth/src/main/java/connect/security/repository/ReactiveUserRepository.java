package connect.security.repository;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface ReactiveUserRepository extends ReactiveCrudRepository<Credential, Integer> {


    @Query("SELECT * FROM user.credential where username= $1")
    Mono<Credential> findByUserName(String username);

}


