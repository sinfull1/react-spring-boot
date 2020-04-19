package connect.connectserver.units;

import connect.dao.StockDao;
import connect.generator.StockGenerator;
import org.junit.Test;

public class StockGeneratorTest {

    @Test
    public void testgenerator()
    {
        StockGenerator sg = new StockGenerator();
        StockDao sd = sg.generateStockQuote();
        System.out.println(sd);
        assert (sd != null);

    }


}
