package connect.service;

import connect.controllers.UploadController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Component
public class StorageServiceImpl implements StorageService {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    @Override
    public void init() throws IOException {
        File f = new File(System.getProperty("java.io.tmpdir"));
        if (f.canWrite()) {
            logger.error("Can't write on the path" + f.getPath());
            throw new IOException("Can't write on the path" + f.getPath());
        }
        logger.error("Storage service init completed" + f.getPath());
    }

    @Override
    public void store(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        Path path = Paths.get(System.getProperty("java.io.tmpdir") + file.getOriginalFilename());
        Files.write(path, bytes);
    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public Path load(String filename) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {

    }
}
