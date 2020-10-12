package connect.generator;

import connect.model.DerivateData;
import connect.service.NseDataService;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class OptionDataGenerator {

    private final NseDataService nseDataService;


    public OptionDataGenerator(NseDataService nseDataService) {
        this.nseDataService = nseDataService;
    }

    public Mono<DerivateData> get(String symbol)
    {
        return  nseDataService.getDerivateData(symbol);
    }
}
