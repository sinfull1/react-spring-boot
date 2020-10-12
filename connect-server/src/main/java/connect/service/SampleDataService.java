package connect.service;

import connect.model.SampleData;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class SampleDataService {


    private final WebClient nseWebClient = WebClient.create("https://jsonplaceholder.typicode.com");


    public Mono<SampleData[]> getSampleData() {
        return nseWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/posts")
                        .build())

                .retrieve()
                .bodyToMono(SampleData[].class);









    }

}
