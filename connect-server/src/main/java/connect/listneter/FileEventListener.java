package connect.listneter;

import connect.events.FileEvent;
import connect.processor.FileEventProcessor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.*;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class FileEventListener implements ApplicationListener<FileEvent> {


    @Autowired
    FileEventProcessor eventProcessor;

    @SneakyThrows
    @Override
    public void onApplicationEvent(FileEvent fileEvent) {
        File files = new File(fileEvent.getSource().toString());
        Path p = Paths.get(files.getAbsolutePath());
        AtomicLong d = new AtomicLong();
        checkFileGrowth(p);
            DataBufferFactory dbf = new DefaultDataBufferFactory();

            Flux<DataBuffer> buffer = DataBufferUtils.read(p, dbf, 256*64);
            Flux<String> stringFlux = buffer.flatMap(dataBuffer -> {
                byte[] bytes = new byte[dataBuffer.readableByteCount()];
                dataBuffer.read(bytes);
                DataBufferUtils.release(dataBuffer);
                return Mono.just(new String(bytes, StandardCharsets.UTF_8)+d.incrementAndGet());
            });
            stringFlux.subscribe(k->eventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
            stringFlux.blockLast();
        }

    private void checkFileGrowth(Path p) throws InterruptedException, IOException {
        long len1 =1;
        long len2 =2;
        while(len1!=len2 ) {
            len1 = Files.size(p);
            Thread.sleep(100);
            len2 = Files.size(p);
            System.out.println(len1);
            System.out.println(len2);
        }
    }

}
