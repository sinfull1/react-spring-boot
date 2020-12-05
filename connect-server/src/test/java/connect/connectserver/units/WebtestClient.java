package connect.connectserver.units;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import connect.controllers.UploadController;
import connect.model.DerivateData;
import connect.model.StockData;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.core.ResolvableType;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.reactive.function.BodyExtractor;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunctions;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class WebtestClient {

@Test
public void test1()
{
    File files = new File("C:\\Users\\micro\\IdeaProjects\\react-spring-boot\\connect-server\\src\\main\\resources\\sample.json");
    Path p = Paths.get(files.getAbsolutePath());
    DataBufferFactory dbf = new DefaultDataBufferFactory();
    Flux<DataBuffer> jjj =  DataBufferUtils.read(p, dbf, 256);

}


    @Test
    public void test() throws  JSONException {
        WebTestClient h = WebTestClient.bindToController(UploadController.class).build();
        WebTestClient.ResponseSpec h9= h.get().uri(uriBuilder -> uriBuilder
                .path("/test")
                .queryParam("fileName", "test.csv")
                .build()).exchange();
        Flux<DataBuffer> g = h9.returnResult(DataBuffer.class).getResponseBody();

        Flux<String> jj = g.flatMap(dataBuffer -> {
                byte[] bytes = new byte[dataBuffer.readableByteCount()];
                dataBuffer.read(bytes);
                DataBufferUtils.release(dataBuffer);
                String jkh = new String(bytes, StandardCharsets.UTF_8);
                return Mono.just(jkh);
          });

        jj.blockLast();


   }



}
