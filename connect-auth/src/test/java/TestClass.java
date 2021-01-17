import connect.security.PBKDF2Encoder;
import org.junit.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

public class TestClass {


    @Test
    public void test()
    {
        PBKDF2Encoder pe = new PBKDF2Encoder();
        pe.setIteration(33);
        pe.setKeylength(256);
        System.out.println(UUID.randomUUID().toString());

        CharSequence chare = "djff";
        System.out.println(pe.encode(chare,UUID.randomUUID().toString()));



    }


}
