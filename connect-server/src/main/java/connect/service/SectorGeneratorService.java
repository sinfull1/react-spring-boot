package connect.service;

import connect.dao.SectorDao;
import connect.generator.SectorGenerator;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.stream.Stream;

@Service
public class SectorGeneratorService {

    public static SectorDao initQuotes() {


        return SectorGenerator.generateSectorQuote();

    }

    public static Flux<SectorDao> getQuotes() {
        Flux<Long> interval = Flux.interval(Duration.ofMillis(1000));
        interval.subscribe((i) -> SectorGenerator.generateSectorQuote());
        Flux<SectorDao> messageFlux = Flux.fromStream(
                Stream.generate(SectorGenerator::generateSectorQuote));

        return Flux.zip(interval, messageFlux).map(Tuple2::getT2);

    }
}