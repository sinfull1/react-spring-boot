package connect.service.storage;

import connect.generator.SectorGenerator;
import connect.model.StockData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.List;
import java.util.Objects;

@Service
public class SectorGeneratorService {


    private final SectorGenerator sectorGenerator;

    @Autowired
    public SectorGeneratorService(SectorGenerator sectorGenerator) {
        this.sectorGenerator = sectorGenerator;
    }

    public List<StockData> initQuotes() {
        return null;
    }

    public Mono<List<StockData>> getQuotes() {
     //   Flux<Long> interval = Flux.interval(Duration.ofMillis(1000));
     //   interval.subscribe((i) -> sectorGenerator.get());
        return sectorGenerator.get();
       // return Flux.zip(interval, flux).map(Tuple2::getT2);
    }


}