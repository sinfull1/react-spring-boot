package connect.controllers;


import connect.processor.DistributedEventProcessor;
import connect.processor.TableProcessor;
import connect.publisher.KafkaPublisher;
import connect.publisher.KafkaTableConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

@RestController
public class KafkaController {

    @Autowired
    KafkaPublisher kafkaPublisher;

    @Autowired
    DistributedEventProcessor distributedEventProcessor;

    @Autowired
    TableProcessor tableProcessor;

    @Autowired
    KafkaTableConsumer kafkaTableConsumer;

    public final ConcurrentLinkedQueue concurrentLinkedList = new ConcurrentLinkedQueue();


    public KafkaController(DistributedEventProcessor distributedEventProcessor)
    {
        this.distributedEventProcessor = distributedEventProcessor;
        for(int i=0;i<90;i++) {
            this.concurrentLinkedList.add("A"+i);
        }
    }

    @GetMapping(value = "/publish")
    public String publish(@RequestParam ("message") String message,
                        @RequestParam ("user") String user  ) throws InterruptedException {
     kafkaPublisher.sendMessages(user+":"+message);
     return "Success";

   }


   @GetMapping(value = "/booking")
    public List<Object> booking() throws InterruptedException {
       return Arrays.asList(concurrentLinkedList.toArray());
    }

    @GetMapping(value = "/consume",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> sub(@RequestParam("user") String user) throws InterruptedException {
      return  distributedEventProcessor.getFlux(user);
    }


    @GetMapping(value = "/conagg")
    public HashMap<String, String> conagg() throws InterruptedException {
        return kafkaTableConsumer.consume();
    }
}
