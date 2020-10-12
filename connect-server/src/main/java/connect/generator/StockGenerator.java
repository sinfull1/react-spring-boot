package connect.generator;

import connect.dao.StockSymbols;
import connect.model.StockData;
import connect.service.NseDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Random;
import java.util.function.Supplier;

@Component
public class StockGenerator {

    private final NseDataService nseDataService;

    private static int counter = -1;

    @Autowired
    public StockGenerator(NseDataService nseDataService) {
        this.nseDataService = nseDataService;
    }


    public Mono<StockData> get(String symbol) {

        return nseDataService.getStockData(symbol);

    }
}
