package connect.controllers;

import connect.dao.SectorDao;
import connect.dao.Strategy;
import connect.generator.SectorGenerator;
import connect.service.SectorGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.HashMap;

@CrossOrigin(origins = {"*"})
@RestController
public class QuotesController {


    @Autowired
    private final SectorGeneratorService sectorGeneratorService;

    private final Strategy strategy = new Strategy();

    public QuotesController(SectorGeneratorService sectorGeneratorService) {
        this.sectorGeneratorService = sectorGeneratorService;
    }

    @GetMapping(value = "/initPrices")
    SectorDao initialQuote() {
        return sectorGeneratorService.initQuotes();
    }


    @GetMapping(value = "/getPrices")
    Flux<SectorDao> getQuotes() {
        return sectorGeneratorService.getQuotes();
    }


    @GetMapping(value = "/getStrategy")
    HashMap<String, Integer> getStrategy() {
        return strategy.get();
    }

}
