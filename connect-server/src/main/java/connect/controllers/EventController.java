package connect.controllers;


import connect.model.SampleData;
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

import java.util.Date;

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
    public void getEvent(@RequestParam("subsId") String subsId,
                         @RequestParam("event") String event
                        ){

        genericEventPublisher.publishGenericEvent(subsId,event);
    }

    @GetMapping(path = "/finiteFlux", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Flux<SampleData>> finiteFlux() {
        return ResponseEntity.ok().body(Flux.range(0, 100)
                .map(tick -> new SampleData()));
    }
    @GetMapping(value = "/getHttp", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> getHttp(@RequestParam("subsId") String subsId) {

        System.out.println("socket subscription id session:"+ subsId);
        FluxProcessor<Object,Object> s = eventProcessor.getProcessor(subsId);
        return s.log()
              //  .map(e-> ResponseEntity.ok().body(e))
                .doOnCancel(()->{

                    eventProcessor.cleanProcessor(s);});
    }

    @GetMapping(value = "/getTime", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Long> getTime(@RequestParam("subsId") String subsId) {

         return Flux.just(new Date().getTime());
    }

}
