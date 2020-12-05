package connect.events;

import org.springframework.context.ApplicationEvent;

public class FileEvent extends ApplicationEvent {

    public FileEvent(String filePath) {
        super(filePath);
    }
}
