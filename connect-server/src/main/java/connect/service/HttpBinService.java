package connect.service;

import io.netty.channel.ChannelPipeline;
import io.netty.handler.timeout.IdleStateHandler;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;
import reactor.netty.tcp.TcpClient;


@Component
public class HttpBinService {

    private final WebClient nseWebClient = createWebClient("https://httpbin.org/", 3);


    public Mono<String> getHttpbin(String id, String val) {
        return nseWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("id", id)
                        .queryParam("val", val)
                        .path("/get")
                        .build())
                .retrieve().bodyToMono(String.class);

    }

    public static WebClient createWebClient(final String baseUrl, final int idleTimeoutSec) {
        final TcpClient tcpClient = TcpClient.create(ConnectionProvider.create("fixed-pool"))
                .doOnConnected(conn -> {
                    final ChannelPipeline pipeline = conn.channel().pipeline();
                    if (pipeline.context("idleStateHandler") == null) {
                        pipeline.addLast("idleStateHandler", new IdleStateHandler(300, 300, 300)
                        );
                    }
                });

        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(HttpClient.from(tcpClient)))
                .baseUrl(baseUrl)
                .build();
    }


}


