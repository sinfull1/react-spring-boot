package connect.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.ws.Response;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition","Content-Type"})
@RestController
public class UploadController {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile[] uploadfile) throws IOException {
        logger.debug("Single file upload!");
        if (uploadfile.length==0) {
            return ResponseEntity.badRequest().build();
        }
        for (int i =0;i<uploadfile.length;i++) {
            byte[] bytes = uploadfile[i].getBytes();
            Path path = Paths.get(System.getProperty("java.io.tmpdir") + uploadfile[i].getOriginalFilename());
            Files.write(path, bytes);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/up")
    public ResponseEntity yesy() {
        return ResponseEntity.ok().build();
    }


  /*  @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
*/
}