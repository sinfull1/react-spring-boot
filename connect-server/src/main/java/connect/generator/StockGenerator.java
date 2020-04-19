package connect.generator;

import connect.dao.StockDao;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class StockGenerator {

    private final static List<String> stocks = Arrays.asList("Reliance", "Tata Consulting", "Infosys");
    private final static List<String> stockCodes = Arrays.asList("REL", "TCS", "INFY");

    public static StockDao generateStockQuote() {
        Random random = new Random();
        int index = random.nextInt(3);
        return new StockDao(stocks.get(index), stockCodes.get(index), random.nextDouble());
    }

    public StockDao generateStockQuote(int index) {
        Random random = new Random();
        return new StockDao(stocks.get(index), stockCodes.get(index), random.nextDouble());
    }

}
