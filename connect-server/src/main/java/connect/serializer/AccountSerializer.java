package connect.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import connect.model.Account;


import java.io.IOException;
import java.util.List;

public class AccountSerializer extends JsonSerializer<List<Account>> {


    @Override
    public void serialize(
            List<Account> accounts, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeObject(accounts);

    }


}