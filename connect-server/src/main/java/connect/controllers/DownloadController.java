package connect.controllers;

import org.apache.tika.config.TikaConfig;
import org.apache.tika.detect.Detector;
import org.apache.tika.exception.TikaException;
import org.apache.tika.io.TikaInputStream;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.mime.MediaType;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DownloadController {
    final  TikaConfig tikaConfig= new TikaConfig();
    final  Detector detector = tikaConfig.getDetector();
    private String tempPath = System.getProperty("java.io.tmpdir") + File.separator+ "myTemp";

    public DownloadController() throws TikaException, IOException {
    }

    @GetMapping(value = "/downloadView")
    @ResponseBody
    public ResponseEntity<FileSystemResource> downloadView( @RequestParam ("fileName") String fileName) throws TikaException, IOException {
        File[] files = new File(tempPath).listFiles();
        assert files != null;
        File requestFile = Arrays.stream(files).filter(file->file.getName().equals(fileName)).collect(Collectors.toList()).get(0);
        assert  requestFile !=null;
        FileSystemResource fileSystemResource  = new FileSystemResource(requestFile);
        TikaInputStream stream = TikaInputStream.get(new FileInputStream(requestFile));
        Metadata metadata = new Metadata();
        metadata.add(Metadata.RESOURCE_NAME_KEY, requestFile.getName());
        String mediaType = detector.detect(stream, metadata).toString();
        stream.close();
        return ResponseEntity.ok()
                .header("content-type", mediaType)
                .body(fileSystemResource);
    }

}