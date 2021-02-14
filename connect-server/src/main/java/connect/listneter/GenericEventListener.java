package connect.listneter;

import connect.events.GenericEvent;
import connect.model.CarModel;
import connect.processor.DistributedEventProcessor;
import connect.processor.SessionEventProcessor;
import connect.publisher.KafkaConsumer;
import connect.publisher.KafkaPublisher;
import connect.service.HttpBinService;
import connect.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenericEventListener implements ApplicationListener<GenericEvent> {

    @Autowired
    SessionEventProcessor eventProcessor;

    @Autowired
    HttpBinService httpBinService;

    @Autowired
    SampleDataService sampleDataService;



   // public static  List<Disposable> disposables = new ArrayList<>();
    @Override
    public void onApplicationEvent(GenericEvent event) {
        switch (event.getEvent()) {
            case "http":
                httpBinService.getHttpbin("1", "2").subscribe(k->eventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
                break;
            case "sample":
                sampleDataService.getSampleData().subscribe(k->eventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
                break;
        }
    }
}
