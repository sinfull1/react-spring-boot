package connect.controllers;


import connect.model.FileInfo;
import connect.processor.FileEventProcessor;
import connect.service.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition", "Content-Type"})
@RestController
public class UploadController {


    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    private String basePath = System.getProperty("java.io.tmpdir") + "myTemp";
    private StorageService storageService;

    private final FileEventProcessor fileEventProcessor;

    @Autowired
    public UploadController(FileEventProcessor fileEventProcessor) {
        this.fileEventProcessor = fileEventProcessor;
    }

    @GetMapping(path = "/test")
    public Flux<DataBuffer> test(@RequestParam("fileName") String fileName) {
        Path p = Paths.get(new File(basePath + fileName).getAbsolutePath());
        DataBufferFactory dbf = new DefaultDataBufferFactory();
        Flux<DataBuffer> flux = DataBufferUtils.read(p, dbf, 256 * 256);
        return flux;
    }

    @GetMapping(path = "/reader", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Object> reader() {
        return fileEventProcessor.getFlux();

    }

    @GetMapping(path = "/files")
    public List<FileInfo> getFiles() {
        List<FileInfo> results = new ArrayList<FileInfo>();
        File[] files = new File(basePath).listFiles();
        for (File file : files) {
            if (file.isFile()) {
                results.add(new FileInfo(file.getPath(), file.getName()));
            }
        }
        return results;
    }


    @PostMapping("/upload")
    public Mono<String> uploadFile(@RequestPart("payload") Flux<FilePart> filePartFlux) throws IOException {
        try {
            Files.createDirectory(Paths.get(basePath));
        } catch (FileAlreadyExistsException e) {
            System.out.println("OK");
        }
        return filePartFlux.flatMap(it -> it.transferTo(Paths.get(basePath + File.separator + it.filename())))
                .then(Mono.just("OK"));
    }

}