package connect.events;


import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import org.springframework.web.server.WebSession;

@Getter
public class GenericEvent<T> extends ApplicationEvent {
    private T payload;
    protected WebSession status;




    public GenericEvent(T payload, WebSession status) {
        super(payload);
        this.payload = payload;
        this.status = status;
    }
}