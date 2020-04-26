package connect.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data // <2>
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserDao {

    private static final long serialVersionUID = 5155720064139820502L;

    private String username;
    private String password;
}
