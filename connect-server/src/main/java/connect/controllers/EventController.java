package connect.controllers;


import connect.processor.EventProcessor;
import connect.publisher.GenericEventPublisher;
import connect.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@CrossOrigin(value = {"*"})
@RestController
public class EventController {

    @Autowired
    EventProcessor eventProcessor;

    @Autowired
    GenericEventPublisher genericEventPublisher;

    @Autowired
    SampleDataService sampleDataService;



    @GetMapping(value = "/event")
    public void getEvent(@RequestParam("eventType") String eventType){
      genericEventPublisher.publishGenericEvent(eventType);
    }


    @GetMapping(value = "/getHttp", produces = MediaType.TEXT_EVENT_STREAM_VALUE)

    public Flux<Object> getHttp() {
        return eventProcessor.getProcessor().log()
                .map(e-> ResponseEntity.ok().body(e));
    }

}
