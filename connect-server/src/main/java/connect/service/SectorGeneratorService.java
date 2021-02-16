package connect.service;



import connect.dao.SectorDao;
import connect.generator.SectorGenerator;
import connect.generator.StockGenerator;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

@Service
public class SectorGeneratorService {

    AtomicInteger a = new AtomicInteger();

    SectorGenerator sectorGenerator = new SectorGenerator();

    public SectorDao initQuotes() {
        return sectorGenerator.get();
    }
    public  Flux<ServerSentEvent<SectorDao>> getQuotes() {
        Flux<Long> interval = Flux.interval(Duration.ofMillis(3000));
        interval.subscribe((i) -> sectorGenerator.get());
        Flux<ServerSentEvent<SectorDao>> messageFlux = Flux.fromStream(Stream.generate(sectorGenerator).map(
                sector->{
                    return ServerSentEvent.<SectorDao> builder().event("pricing-event").id(String.valueOf(a.getAndIncrement()))
                            .data(sector).build();}

        ));
        return Flux.zip(interval, messageFlux).map(Tuple2::getT2);
    }
}