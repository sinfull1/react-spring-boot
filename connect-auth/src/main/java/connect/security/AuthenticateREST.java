package connect.security;


import connect.security.repository.Credential;

import connect.security.repository.ReactiveUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

@CrossOrigin(origins = {"*"})
@RestController
public class AuthenticateREST {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private PBKDF2Encoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    ReactiveUserRepository repository;



    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json")
    public Mono<ResponseEntity<?>> login(@RequestBody AuthRequest ar) {
        return  repository.findByUserName(ar.getUsername()).map(userDetails -> {
            if (passwordEncoder.encode(ar.getPassword()).equals(userDetails.getPassword())) {
                return ResponseEntity.ok(new AuthResponse(jwtUtil.generateToken(userDetails)));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }).defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Mono<String> register() {
        Credential user = new Credential();
        user.setUsername(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode("password"));
        user.setEmail(UUID.randomUUID().toString());
        user.setSalt(UUID.randomUUID().toString());
        user.setActive(true);
        user.setCreated(Timestamp.from(Instant.now()));

        return repository.save(user).flatMap(x->Mono.just(x.getUsername()));

    }
}