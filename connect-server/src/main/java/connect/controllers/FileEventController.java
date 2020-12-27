package connect.controllers;

import connect.model.FileInfo;
import connect.processor.FileEventProcessor;
import connect.publisher.FileEventPublisher;
import connect.service.storage.FileStorageService;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;


@CrossOrigin(origins = {"*"})
@RestController
public class FileEventController {


    private final FileEventProcessor fileEventProcessor;
    private final FileStorageService storageService;
    private final FileEventPublisher fileEventPublisher;


    public FileEventController(FileEventProcessor fileEventProcessor, FileStorageService storageService, FileEventPublisher fileEventPublisher) {
        this.fileEventProcessor = fileEventProcessor;
        this.storageService = storageService;
        this.fileEventPublisher = fileEventPublisher;
    }


    @GetMapping(path = "/fileContent")
    public void test(@RequestParam("fileName") String fileName) {
        FileInfo fileInfo = storageService.getFile(fileName);
        fileEventPublisher.publishFileEvent(fileInfo.getName());
    }

    @GetMapping(path = "/fileStream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> reader() {
        return fileEventProcessor.getFlux();
    }


}
