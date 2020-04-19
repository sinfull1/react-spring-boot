package connect.generator;

import connect.dao.SectorDao;
import connect.dao.StockDao;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class SectorGenerator {
    private final static List<String> sectors = Arrays.asList("OIL", "IT", "BFSI");

    public static SectorDao generateSectorQuote() {
        Random random = new Random();
        int index = random.nextInt(3);
        StockGenerator sg = new StockGenerator();
        List<StockDao> list = Arrays.asList(sg.generateStockQuote(index),
                sg.generateStockQuote(index),
                sg.generateStockQuote(index));
       return new SectorDao(sectors.get(index), list);


    }

}
