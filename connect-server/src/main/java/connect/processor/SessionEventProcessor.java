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
        return map.get(userId);
    }

    public void cleanProcessor(FluxProcessor<Object, Object > s) {
        map.entrySet()
                .removeIf(
                        entry -> (s
                                .equals(entry.getValue())));

    }
}
