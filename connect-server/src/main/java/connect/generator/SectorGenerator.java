package connect.generator;

import connect.dao.SectorDao;

import java.util.Arrays;
import java.util.List;

public class SectorGenerator {
    private final static List<String> sectors = Arrays.asList("OIL", "IT", "BFSI");

    public static SectorDao generateSectorQuote() {
        return new SectorDao("Group1",  new StockGenerator().generateStockListQuote());


    }

}
