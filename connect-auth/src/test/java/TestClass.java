import connect.security.PBKDF2Encoder;
import org.junit.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

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


}
