package connect.listneter;

import connect.events.GenericEvent;
import connect.processor.SessionEventProcessor;
import connect.service.HttpBinService;
import connect.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import reactor.core.publisher.FluxProcessor;

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
        FluxProcessor<Object,Object> processor = eventProcessor.getProcessor(event.getPayload().toString());
        switch ("http") {
            case "http":
                httpBinService.getHttpbin("1", "2").subscribe(processor::onNext);
                break;
            case "sample": {
                sampleDataService.getSampleData().subscribe(processor::onNext);
                break;
            }
        }
    }
}
