import connect.security.AuthCodeRequest;
import connect.security.PBKDF2Encoder;
import io.jsonwebtoken.lang.Strings;
import org.junit.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TestClass {


    @Test
    public void test()
    {
        PBKDF2Encoder pe = new PBKDF2Encoder();
        pe.setIteration(33);
        pe.setKeylength(64);
        pe.setSecret("ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave64ByteLength");
        CharSequence chare = "djff";
        System.out.println(pe.encode(chare));



    }

    @Test
    public void getAuthCodeObject() {




    }



}
