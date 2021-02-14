package connect.processor;

import connect.publisher.KafkaConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Component
public class DistributedEventProcessor {


    private Logger logger = LoggerFactory.getLogger(getClass());

    Sinks.Many<Object> replaySink = Sinks.many().replay().limit(1);



    public DistributedEventProcessor() {
    }
    public Flux<Object> getFlux(String user) {
        return replaySink.asFlux();
    }
    public Sinks.Many<Object> getSink() {
        return replaySink;
    }
}
