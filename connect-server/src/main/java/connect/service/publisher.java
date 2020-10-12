package connect.service;

import connect.model.StockData;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.List;

public class publisher extends Flux<List<StockData>> {


    @Override
    public void subscribe(CoreSubscriber<? super List<StockData>> coreSubscriber) {
        coreSubscriber.onNext(Arrays.asList(new StockData()));
    }
}
