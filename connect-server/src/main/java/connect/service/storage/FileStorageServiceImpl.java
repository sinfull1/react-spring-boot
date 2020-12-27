package connect.service.storage;

import connect.controllers.UploadController;
import connect.model.FileInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Component;
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
import java.util.stream.Stream;

@Component
public class FileStorageServiceImpl implements FileStorageService {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    private String basePath = System.getProperty("java.io.tmpdir") + "myTemp";


    FileStorageServiceImpl() throws IOException {
        this.init();
    }
    @Override
    public void init() throws IOException {
        try {
            Files.createDirectory(Paths.get(basePath));
        } catch (FileAlreadyExistsException e) {
            logger.info("Directory Already exists" + basePath);
        }
        logger.info("Storage service init completed");
    }

    @Override
    public Mono<Boolean> store(Flux<FilePart> filePartFlux)  {
            return   filePartFlux.flatMap(it -> it.transferTo(Paths.get(basePath + File.separator + it.filename()))).then(Mono.just(true));
    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public FileInfo getFile(String fileName) {
        return new FileInfo(fileName,fileName);
    }

    @Override
    public List<FileInfo> getAllFileInfo() {
        List<FileInfo> results = new ArrayList<FileInfo>();
        File[] files = new File(basePath).listFiles();
        assert files != null;
        for (File file : files) {
            if (file.isFile()) {
                results.add(new FileInfo(file.getPath(), file.getName()));
            }
        }
        return results;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {

    }
}
