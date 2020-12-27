package connect.generator;

import connect.dao.SectorDao;
import connect.dao.StockSymbols;
import connect.model.DerivateData;
import connect.model.StockData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;

@Component



    public class SectorGenerator implements Supplier<SectorDao> {


        private final static List<String> sectors = Arrays.asList("OIL", "IT", "BFSI");

        StockGenerator stockGenerator = new StockGenerator();


        @Override
        public SectorDao get() {
            return new SectorDao("Group1", stockGenerator.get());
        }


}

