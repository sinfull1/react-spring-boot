package connect.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import connect.model.Party;

import java.io.IOException;
import java.util.List;

public class PartySerializer extends JsonSerializer<List<Party>> {


    @Override
    public void serialize(
            List<Party> parties, JsonGenerator jgen, SerializerProvider provider)
            throws IOException {

        jgen.writeObject(parties);

    }


}