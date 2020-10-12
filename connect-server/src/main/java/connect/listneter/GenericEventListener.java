package connect.listneter;

import connect.events.GenericEvent;
import connect.processor.EventProcessor;
import connect.service.HttpBinService;
import connect.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class GenericEventListener implements ApplicationListener<GenericEvent> {

    @Autowired
    EventProcessor eventProcessor;

    @Autowired
    HttpBinService httpBinService;

    @Autowired
    SampleDataService sampleDataService;


    @Override
    public void onApplicationEvent(GenericEvent event) {
        switch (event.getPayload().toString()) {
            case "http":
                httpBinService.getHttpbin("1", "2").subscribe(eventProcessor::onNext);
                break;
            case "sample": {
                sampleDataService.getSampleData().subscribe(eventProcessor::onNext);
                break;
            }
        }
    }
}
