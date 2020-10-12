package connect.service;

import connect.model.DerivateData;
import connect.model.StockData;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;


@Component
public class HttpBinService {

    private final WebClient nseWebClient = WebClient.create("https://httpbin.org/");


    public Mono<String> getHttpbin(String id, String val) {
        return nseWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("id",id)
                        .queryParam("val",val)
                        .path("/get")
                        .build())

                .exchange().

                        log().
                        flatMap(response -> {
                                    if (!response.statusCode().is4xxClientError()) {
                                        return response.bodyToMono(String.class);
                                    } else {
                                        return Mono.just("");
                                    }
                                }
                        );
    }


}


