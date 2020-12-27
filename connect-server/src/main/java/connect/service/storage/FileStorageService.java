package connect.service.storage;

import connect.model.FileInfo;
import org.springframework.core.io.Resource;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface FileStorageService {

    void init() throws IOException;

    Mono<Boolean> store(Flux<FilePart> filePartFlux) throws IOException;

    Stream<Path> loadAll();

    FileInfo getFile(String fileName);

    List<FileInfo> getAllFileInfo();

    Resource loadAsResource(String filename);

    void deleteAll();

}