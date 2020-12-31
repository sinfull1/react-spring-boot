package connect.service;

import connect.publisher.FileEventPublisher;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.File;
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
    private String publishPath = System.getProperty("java.io.tmpdir") + File.separator+ "myPublish";

    private String tempPath = System.getProperty("java.io.tmpdir") + File.separator+ "myTemp";


    @Autowired
    FileEventPublisher fileEventPublisher;


    @SneakyThrows
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent readyEvent) {
        Path path = Paths.get(publishPath);
        Path temp = Paths.get(tempPath);

        try{Files.createDirectory(path);}
        catch (FileAlreadyExistsException ex)
        {System.out.println(ex.toString());}
        try{Files.createDirectory(temp);}
        catch (FileAlreadyExistsException ex)
        {System.out.println(ex.toString());}
        try (WatchService watchService = FileSystems.getDefault().newWatchService()) {
            path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE);
            WatchKey key = null;
            while (true) {
                if ((key = watchService.take()) == null) break;
                for (WatchEvent<?> event : key.pollEvents()) {
                    fileEventPublisher.publishFileEvent(path.toString() + "\\" + event.context().toString());
                }
                key.reset();
            }

        } catch (IOException | InterruptedException e) {

        }
    }
}
