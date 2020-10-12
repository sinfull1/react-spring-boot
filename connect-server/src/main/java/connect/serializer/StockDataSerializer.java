package connect.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import connect.model.Account;
import connect.model.Party;
import connect.model.StockData;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.List;

public class StockDataSerializer extends JsonSerializer<Mono<List<StockData>>> {



    @Override
    public void serialize(Mono<List<StockData>> stockFlux, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
      List<StockData> data =   stockFlux.block();
      jsonGenerator.writeObject(data);
    }
}
