package connect.connectserver.units;

import connect.generator.StockGenerator;
import org.junit.Test;

public class StockGeneratorTest {

    @Test
    public void testgenerator() {
        StockGenerator stockGenerator = new StockGenerator();
        System.out.println(stockGenerator.get());
    }
}
