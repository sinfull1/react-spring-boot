package connect.generator;

import connect.dao.StockDao;
import connect.dao.StockSymbols;
import connect.model.StockData;
import connect.service.NseDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Supplier;

@Component
public class StockGenerator implements Supplier<List<StockDao>> {


    private static int counter = -1;

    @Override
    public List<StockDao> get() {
        Random random = new Random();
        List<StockDao> ret = new ArrayList<StockDao>();
        for (String stock : StockSymbols.symList) {
            ret.add(new StockDao(stock, stock, random.nextDouble() * 100));

        }

        return ret;
    }
}
