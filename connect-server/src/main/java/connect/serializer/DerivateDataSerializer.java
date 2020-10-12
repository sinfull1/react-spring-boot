package connect.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import connect.model.DerivateData;
import connect.model.Party;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;
import java.time.Duration;
import java.util.List;

public class DerivateDataSerializer extends JsonSerializer<Mono<DerivateData>> {
    @Override
    public void serialize(Mono<DerivateData> derivateDataMono, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        derivateDataMono.flatMap(d->
        {
            try {
                jsonGenerator.writeObject(d);
            } catch (IOException e) {
                e.printStackTrace();
            }
           return Mono.just(d);
        }).subscribe();

    }
}
