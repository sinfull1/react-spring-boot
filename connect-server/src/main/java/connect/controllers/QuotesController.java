package connect.controllers;

import connect.dao.SectorDao;
import connect.service.SectorGeneratorService;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;

@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition", "Content-Type"})
@RestController
public class QuotesController {


    @Autowired
    private final SectorGeneratorService sectorGeneratorService;

    public QuotesController(SectorGeneratorService sectorGeneratorService) {
        this.sectorGeneratorService = sectorGeneratorService;
    }

    @GetMapping(value ="/initPrices", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<SectorDao> initialQuote() {
        return sectorGeneratorService.getQuotes();
    }
    @GetMapping(value ="/getPrices", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<SectorDao> getQuotes() {
        return sectorGeneratorService.getQuotes();
    }


}
