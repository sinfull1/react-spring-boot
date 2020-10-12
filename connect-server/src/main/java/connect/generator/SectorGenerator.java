package connect.generator;

import connect.dao.StockSymbols;
import connect.model.DerivateData;
import connect.model.StockData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.List;
import java.util.function.Supplier;

@Component

public class SectorGenerator implements Supplier<Mono<List<StockData>>> {


    private final StockGenerator stockGenerator;
    private final OptionDataGenerator optionDataGenerator;

    @Autowired
    public SectorGenerator(StockGenerator stockGenerator, OptionDataGenerator optionDataGenerator) {
        this.stockGenerator = stockGenerator;
        this.optionDataGenerator = optionDataGenerator;
    }


    @Override

    public Mono<List<StockData>> get() {
        return Flux.fromIterable(StockSymbols.symList).delayElements(Duration.ofMillis(2000))
                .flatMap(stockGenerator::get)
                .flatMap(item -> {
                    Mono<DerivateData> derivateData = optionDataGenerator.get(item.getInfo().getSymbol());
                    derivateData = derivateData.flatMap(dd ->
                    {
                        item.setDerivateData(dd);
                        return Mono.just(dd);
                    });
                    Mono<StockData> stockData = Mono.just(item);
                    return Flux.zip(stockData, derivateData).map(Tuple2::getT1);

                })
                //  .ordered((u1, u2) -> u2.hashCode() - u1.hashCode())
                .collectList();

    }

}

