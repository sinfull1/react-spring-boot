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
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.Mono;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class FileEventListener implements ApplicationListener<FileEvent> {


    @Autowired
    FileEventProcessor eventProcessor;

    @SneakyThrows
    @Override
    public void onApplicationEvent(FileEvent fileEvent) {
        File files = new File(fileEvent.getSource().toString());
        Path p = Paths.get(files.getAbsolutePath());
        checkFileGrowth(files);
            DataBufferFactory dbf = new DefaultDataBufferFactory();
            Flux<DataBuffer> d1 = DataBufferUtils.read(p, dbf, 256);
            String j = d1.flatMap(dataBuffer -> {
                byte[] bytes = new byte[dataBuffer.readableByteCount()];
                dataBuffer.read(bytes);
                DataBufferUtils.release(dataBuffer);
                return Mono.just(new String(bytes, StandardCharsets.UTF_8));
            }).reduce((one, two) -> one + two).block();
            eventProcessor.getProcessors().forEach(pro-> pro.onNext(j));
        }

    private void checkFileGrowth(File p) throws InterruptedException {
        long len1 =1;
        long len2 =2;
        while(len1!=len2) {
             len1 = p.length();
            Thread.sleep(10);
            len2 = p.length();
        }



    }

}
