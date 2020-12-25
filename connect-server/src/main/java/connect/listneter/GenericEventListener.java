package connect.listneter;

import connect.events.GenericEvent;
import connect.model.CarModel;
import connect.processor.SessionEventProcessor;
import connect.service.HttpBinService;
import connect.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.Sinks;

@Component
public class GenericEventListener implements ApplicationListener<GenericEvent> {

    @Autowired
    SessionEventProcessor eventProcessor;

    @Autowired
    HttpBinService httpBinService;

    @Autowired
    SampleDataService sampleDataService;


    @Override
    public void onApplicationEvent(GenericEvent event) {
        switch (event.getEvent()) {
            case "http":
                httpBinService.getHttpbin("1", "2").subscribe(k->eventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
                break;
            case "sample":
                sampleDataService.getSampleData().subscribe(k->eventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
                break;

            case "table":
                Flux.just(new CarModel("a","b",234)).subscribe(k->eventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
                break;

        }
    }
}
