package connect.publisher;

import connect.events.GenericEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebSession;

@Component
public class GenericEventPublisher<T> {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;


    public void publishGenericEvent(String eventType, WebSession session) {
        System.out.println("Publishing custom event. ");
        GenericEvent genericEvent = new GenericEvent(eventType, session);
        applicationEventPublisher.publishEvent(genericEvent);
    }

}
