package connect.connectserver.units;

import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Hooks;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Fluxtests {

    class OnEveryFunction<V> implements Function<V, Object>
    {

        @Override
        public Object apply(Object o) {
            System.out.println("onEachOperator--   "+ o.toString());
            if (o == null )
                return 1;
            if (o instanceof Integer )
                return 0;
            return o;

        }

    }

    public Integer getCsvQuotes(Integer x) throws RuntimeException
    {
        System.out.println("doing"+x);
        Random random = new Random();
        if( random.nextInt()%2==0) {
            System.out.println("x");
            throw new RuntimeException("xx");
        }
        return  x ;
    }

    public Integer  convertHistoricalCSVToStockQuotation(Integer x) {
        return x+1;
    }
    @Test
    public void test() {


    //Hooks.onEachOperator(new OnEveryFunction());
        //   Hooks.onOperatorError((i,o)-> ));

        Hooks.onNextDropped(o -> System.out.println("onNextDropped- - " + o));
        List<Object> valuesDropped = new ArrayList<>();
        List<Throwable> errorsDropped = new ArrayList<>();
        Hooks.onNextError(
                (t, s) -> {
                    System.out.println("onNextError   ---- " + t.getLocalizedMessage());
                    errorsDropped.add(t);
                    valuesDropped.add(s);
                    return t;
                });
//        Operator error = Hooks.onNextDropped(new ErrorConsumer());



       Flux.fromIterable(Arrays.asList(1,2,3,4,4,5)).log().subscriberContext(ctx->ctx.put("Key","Value"))
                .flatMap(x ->  Mono.fromCallable(() -> getCsvQuotes(x)).retry(1).onErrorReturn(16))
                        .flatMap(x->
                                Flux.just(x.toString())).reduce((s1,s2)-> {return s1+s2;})



                .subscribe(x-> System.out.println(Objects.requireNonNull(x.toString())));

    }


}
