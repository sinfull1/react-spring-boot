package connect.connectserver.units;

import connect.dao.StockDao;
import connect.generator.StockGenerator;
import org.junit.Test;

public class StockGeneratorTest {

    @Test
    public void testgenerator() {
        System.out.println(StockGenerator.generateStockListQuote());
    }
}
