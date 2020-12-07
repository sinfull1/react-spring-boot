package connect.connectserver.units;

import org.junit.jupiter.api.Test;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

public class SinkTest {

    @Test
    public void test()
    {
        Sinks.Many<Object> replaySink = Sinks.many().replay().all();

        replaySink.emitNext(1, Sinks.EmitFailureHandler.FAIL_FAST);
        replaySink.emitNext(2, Sinks.EmitFailureHandler.FAIL_FAST);
        Flux<Object> fluxView1 = replaySink.asFlux();
        fluxView1.subscribe(System.out::println);
        fluxView1.subscribe(System.out::println);



    }
}
