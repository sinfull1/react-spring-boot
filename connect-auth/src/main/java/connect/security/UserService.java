package connect.security;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    // this is just an example, you can load the user from the database from the repository

    private Map<String, User> data;

    @PostConstruct
    public void init(){
        data = new HashMap<>();

        //username:passwowrd -> user:user
        data.put("user", new User("user", "check1", true, Arrays.asList(Role.ROLE_USER)));

        data.put("user2", new User("user2", "check1", true, Arrays.asList(Role.ROLE_USER)));
//username:passwowrd -> admin:admin
        data.put("admin", new User("admin", "dQNjUIMorJb8Ubj2+wVGYp6eAeYkdekqAcnYp+aRq5w=", true, Arrays.asList(Role.ROLE_ADMIN)));
    }

    public Mono<User> findByUsername(String username) {
        if (data.containsKey(username)) {
            return Mono.just(data.get(username));
        } else {
            return Mono.empty();
        }
    }

    public boolean addUser(RegisterRequest register) {
        data.put ("user",new User(register.getUsername(),register.getPassword(),true,Arrays.asList(Role.ROLE_USER)));
        return true;
    }

}