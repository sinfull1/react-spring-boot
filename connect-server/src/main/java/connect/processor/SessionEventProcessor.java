package connect.processor;



import org.reactivestreams.Subscriber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


import org.springframework.web.server.WebSession;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.FluxProcessor;

import java.util.HashMap;
import java.util.Map;


@Component
public class SessionEventProcessor {

    private Logger logger = LoggerFactory.getLogger(getClass());

    Map<String, FluxProcessor<Object,Object>> map =
    new HashMap<String, FluxProcessor<Object,Object>>();

    public SessionEventProcessor(){

    }

    public FluxProcessor<Object,Object>  getProcessor(String userId) {
        map.putIfAbsent(userId, DirectProcessor.create().serialize());
        System.out.println(map.size());
        return map.get(userId);
    }

    public void onNext(Object alert){
        logger.info("onNext [{}]", alert);
        map.entrySet().stream().map(Map.Entry::getValue).findFirst().get().onNext(alert);
    }


    public void cleanProcessor(FluxProcessor<Object, Object > s) {
        map.entrySet()
                .removeIf(
                        entry -> (s
                                .equals(entry.getValue())));

    }
}
