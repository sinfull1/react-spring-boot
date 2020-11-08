package connect.service;

import connect.model.DerivateData;
import connect.model.StockData;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;



@Component
public class NseDataService {

    private final WebClient nseWebClient = WebClient.create("https://www.nseindia.com/");


    public Mono<StockData> getStockData(String symbol) {
        return nseWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/quote-equity/")
                        .queryParam("symbol", symbol)
                        .build())

                        .exchange().log().
                        flatMap(response -> {
                                    if (response.statusCode().is2xxSuccessful()) {
                                        return response.bodyToMono(StockData.class);
                                    } else {
                                        return Mono.just(new StockData());
                                    }
                                }
                        );
    }

    public Mono<DerivateData> getDerivateData(String symbol) {
        return nseWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/quote-derivative/")
                        .queryParam("symbol", symbol)
                   //     .queryParam("identifier", "OPTSTK" + symbol + date + type + strike)
                        .build())

                        .exchange().log().
                        flatMap(response -> {
                                    if (response.statusCode().is2xxSuccessful()) {
                                        return response.bodyToMono(DerivateData.class);
                                    } else {
                                        response.bodyToMono(Void.class).then(Mono.empty());
                                        return Mono.just(new DerivateData());
                                    }
                                }
                        );
    }
}


