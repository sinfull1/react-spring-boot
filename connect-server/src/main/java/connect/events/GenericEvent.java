package connect.events;


import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class GenericEvent<T> extends ApplicationEvent {
    private String subsId;
    private String event;


    public GenericEvent(String subsId, String event) {
        super(event);
        this.subsId = subsId;
        this.event = event;
    }
}