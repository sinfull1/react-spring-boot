package connect.generator;

import connect.dao.SectorDao;

import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;

public class SectorGenerator implements Supplier<SectorDao> {


    private final static List<String> sectors = Arrays.asList("OIL", "IT", "BFSI");

    StockGenerator stockGenerator = new StockGenerator();


    @Override
    public SectorDao get() {
        return new SectorDao("Group1", stockGenerator.get());
    }
}
