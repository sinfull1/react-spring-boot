package connect.security.repository;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;

@Getter
@Setter
public class Credential {

    @Id
    private Integer userId;

    private String username;

    private String password;

    private String salt;

    private String email;

    private Timestamp created;

    private boolean active;



}