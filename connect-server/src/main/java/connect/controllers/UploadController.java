package connect.controllers;


import connect.model.FileInfo;
import connect.service.storage.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.List;

@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition", "Content-Type"})
@RestController
public class UploadController {


    private final FileStorageService storageService;

    public UploadController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping(path = "/files")
    public List<FileInfo> getFiles() {
        return storageService.getAllFileInfo();
    }


    @GetMapping(path = "/getPublishFiles")
    public List<FileInfo> getPublishFiles() {
        return storageService.getPubishFileInfo();
    }


    @GetMapping(path = "/publishFile")
    public boolean getPublishFiles(@RequestParam("fileName") String fileName) throws IOException {
        return storageService.publishFile(fileName);
    }


    @PostMapping("/upload")
    public Mono<Boolean> uploadFile(@RequestPart("payload") Flux<FilePart> filePartFlux) throws IOException {
        return storageService.store(filePartFlux);

    }

    @GetMapping("/deleteFile")
    public Mono<Boolean> deleteFile(@RequestParam("fileName") String fileName) throws IOException {
        return storageService.delete(fileName);

    }

}