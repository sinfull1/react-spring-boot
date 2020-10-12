package connect.events;


import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class GenericEvent<T> extends ApplicationEvent {
    private T payload;
    protected boolean status;




    public GenericEvent(T payload, boolean status) {
        super(payload);
        this.payload = payload;
        this.status = status;
    }
}