package connect.generator;

import connect.dao.StockDao;
import connect.dao.StockSymbols;

import java.util.*;

public class StockGenerator {


    private static int counter = -1;

    public static List<StockDao> generateStockListQuote() {
        Random random = new Random();
        List<StockDao> ret = new ArrayList<StockDao>();
        for(String stock: StockSymbols.symList)
        {
            ret.add( new StockDao(stock, stock, random.nextDouble()));

        }

        return ret;
    }

}
