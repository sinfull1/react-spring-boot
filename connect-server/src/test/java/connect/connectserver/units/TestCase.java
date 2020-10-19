package connect.connectserver.units;

import org.junit.Test;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;


public class TestCase {

    @Test
    public void test() {


        WebClient we =

                WebClient.builder().baseUrl("https://www.quandl.com/").
                        exchangeStrategies(ExchangeStrategies.builder()
                                .codecs(configurer -> configurer
                                        .defaultCodecs()
                                        .maxInMemorySize(16 * 1024 * 1024))
                                .build())
                        .build();
        String[] f = we.get().uri("api/v3/datasets/WIKI/AAPL.csv").exchange().
                flatMap(response -> response.bodyToMono(String.class))
                .flatMap(response -> Mono.just(response.split("\\R")))
                .block();

      //  Arrays.asList(f).stream().forEach(System.out::println);

    }
    @Test
    public void test1()
    {
        WebClient we =  WebClient.builder().baseUrl("https://apidojo-yahoo-finance-v1.p.rapidapi.com/").build();
        Mono<String > request = we.get()
                .uri(uriBuilder -> uriBuilder
                        .path("market/v2/get-quotes")
                        .queryParam("symbols", "AMD")
                        .queryParam("region", "US")
                        .build())
                .header("x-rapidapi-host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
                .header("x-rapidapi-key", "989fa2c107msh167f8f21656125dp1d915djsn4651ec6fdb91")
               .exchange().flatMap(response-> response.bodyToMono(String.class))

                ;

        System.out.println(request.block());

    }
}