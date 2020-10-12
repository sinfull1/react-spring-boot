package connect.processor;



import org.reactivestreams.Subscriber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.FluxProcessor;


@Component
public class EventProcessor {

    private Logger logger = LoggerFactory.getLogger(getClass());

    private FluxProcessor<Object, Object> processor;

    public EventProcessor(){
        processor = DirectProcessor.create().serialize();
    }

    public FluxProcessor<Object,Object>  getProcessor() {
        return processor;
    }

    public void subscribe(Subscriber<? super Object> subscriber){
        logger.info("subscribe [{}]", subscriber);
        processor.subscribe(subscriber);
    }

    public void onNext(Object alert){
        logger.info("onNext [{}]", alert);
        processor.onNext(alert);
    }

    public void onComplete(){
        logger.info("onComplete");
        processor.onComplete();
    }

    public void onError(Throwable t){
        logger.error("onError", t);
        processor.onError(t);
    }

}
