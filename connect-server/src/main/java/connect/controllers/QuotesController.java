package connect.controllers;

import connect.dao.Strategy;
import connect.model.StockData;
import connect.service.storage.SectorGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
public class QuotesController {


    @Autowired
    private final SectorGeneratorService sectorGeneratorService;

    private final Strategy strategy = new Strategy();

    public QuotesController(SectorGeneratorService sectorGeneratorService) {
        this.sectorGeneratorService = sectorGeneratorService;
    }


    @GetMapping(value = "/getPrices", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Mono<List<StockData>> getQuotes() {
        return sectorGeneratorService.getQuotes();
    }


    @GetMapping(value = "/getStrategy")
    HashMap<String, Integer> getStrategy() {
        return strategy.get();
    }

}
