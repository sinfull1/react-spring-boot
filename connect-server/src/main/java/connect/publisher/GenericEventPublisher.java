package connect.publisher;

import connect.events.GenericEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class GenericEventPublisher<T> {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;


    public void publishGenericEvent(String eventType) {
        System.out.println("Publishing custom event. ");
        GenericEvent genericEvent = new GenericEvent(eventType, true);
        applicationEventPublisher.publishEvent(genericEvent);
    }

}
