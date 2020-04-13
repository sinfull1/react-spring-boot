package connect.controllers;


import connect.service.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition", "Content-Type"})
@RestController
public class UploadController {

    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    private final StorageService storageService;

    public UploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile[] file) throws IOException {

        logger.info("Recieved request to upload files. Total of " + file.length);
        if (file.length == 0) {
            return ResponseEntity.badRequest().build();
        }
        for (int i = 0; i < file.length; i++) {
            storageService.store(file[i]);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/up")
    public ResponseEntity yesy() {
        return ResponseEntity.ok().build();
    }

}