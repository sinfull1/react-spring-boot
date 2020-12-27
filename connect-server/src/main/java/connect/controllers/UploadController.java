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


    @PostMapping("/upload")
    public Mono<Boolean> uploadFile(@RequestPart("payload") Flux<FilePart> filePartFlux) throws IOException {
        return storageService.store(filePartFlux);

    }

}