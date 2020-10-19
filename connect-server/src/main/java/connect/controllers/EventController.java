package connect.controllers;


import connect.processor.SessionEventProcessor;
import connect.publisher.GenericEventPublisher;
import connect.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;

@CrossOrigin(value = {"*"})
@RestController
public class EventController {

    @Autowired
    SessionEventProcessor eventProcessor;

    @Autowired
    GenericEventPublisher genericEventPublisher;

    @Autowired
    SampleDataService sampleDataService;



    @GetMapping(value = "/event")
    public void getEvent(@RequestParam("eventType") String eventType, WebSession ses){
        genericEventPublisher.publishGenericEvent(eventType,ses);
    }


    @GetMapping(value = "/getHttp", produces = MediaType.TEXT_EVENT_STREAM_VALUE)

    public Flux<Object> getHttp(@RequestParam("userId") String userId,WebSession webSession) {
        webSession.start();
        System.out.println("socket session"+ userId);
        FluxProcessor<Object,Object> s = eventProcessor.getProcessor(userId);
        return s.log()
              //  .map(e-> ResponseEntity.ok().body(e))
                .doOnCancel(()->{

                    eventProcessor.cleanProcessor(s);});
    }

}
