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
    ReactiveUserRepository repository;

    @Autowired
    EmailServiceImpl emailService;


    @RequestMapping(value = "/")
    public String base()
    {
        return "true";
    }
    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json")
    public Mono<ResponseEntity<?>> login(@RequestBody AuthRequest ar) {
        return getToken(ar);

    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Mono<ResponseEntity<?>>  register(@RequestBody RegisterRequest ar) {
        Credential user = new Credential();
        String secret = UUID.randomUUID().toString();
        user.setUsername(ar.getUsername());
        user.setPassword(passwordEncoder.encode(ar.getPassword(), secret));
        user.setEmail(ar.getEmail());
        user.setSalt(secret);
        user.setActive(true);
        user.setCreated(Timestamp.from(Instant.now()));
        repository.save(user).flatMap(x->Mono.just(x.getUsername())).block();
        ResponseEntity<?>  token =  getToken(new AuthRequest(ar.getUsername(),ar.getPassword(),null)).block();
        return Mono.just(token);

    }

    private Mono<ResponseEntity<?>> getToken(AuthRequest ar)
    {
      return  repository.findByUserName(ar.getUsername()).map(userDetails -> {
            if (passwordEncoder.encode(ar.getPassword(),userDetails.getSalt()).equals(userDetails.getPassword())) {
                return ResponseEntity.ok(new AuthResponse(jwtUtil.generateToken(userDetails)));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }).defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}