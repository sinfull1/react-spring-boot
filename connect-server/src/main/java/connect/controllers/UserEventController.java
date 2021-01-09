package connect.controllers;


import connect.processor.SessionEventProcessor;
import connect.publisher.GenericEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;


@RestController
public class UserEventController {

    @Autowired
    SessionEventProcessor eventProcessor;

    @Autowired
    GenericEventPublisher genericEventPublisher;


    @GetMapping(value = "/event")
    public void getEvent(@RequestParam("subsId") String subsId,
                         @RequestParam("event") String event
    ) {
        genericEventPublisher.publishGenericEvent(subsId, event);
    }

    @GetMapping(value = "/getHttp", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> getHttp(@RequestParam("subsId") String subsId) {
        System.out.println("socket subscription id session:" + subsId);
        return eventProcessor.getFlux();

    }


}
