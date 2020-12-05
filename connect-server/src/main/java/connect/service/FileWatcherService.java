package connect.service;

import connect.publisher.FileEventPublisher;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.*;

@Component
public class FileWatcherService implements ApplicationListener<ApplicationReadyEvent> {

    WatchService watchService;

    {
        try {
            watchService = FileSystems.getDefault().newWatchService();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    Path path = Paths.get("C:\\Users\\micro\\IdeaProjects\\react-spring-boot\\connect-server\\src\\main\\resources\\");

    @Autowired
    FileEventPublisher fileEventPublisher;


    @SneakyThrows
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent readyEvent) {
        path.register(watchService,StandardWatchEventKinds.ENTRY_CREATE);
        WatchKey key;
        while ((key = watchService.take()) != null) {
            for (WatchEvent<?> event : key.pollEvents()) {


               fileEventPublisher.publishFileEvent(path.toString() +"\\"+ event.context().toString());
            }
           key.reset();
        }
    }
}
