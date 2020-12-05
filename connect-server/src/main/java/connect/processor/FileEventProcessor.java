package connect.processor;



import org.reactivestreams.Subscriber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


import org.springframework.web.server.WebSession;
import org.yaml.snakeyaml.emitter.Emitter;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.FluxProcessor;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class FileEventProcessor {

    private Logger logger = LoggerFactory.getLogger(getClass());

    Map<String, FluxProcessor<Object,Object>> map =
            new HashMap<String, FluxProcessor<Object,Object>>();

    public FileEventProcessor(){

    }

    public FluxProcessor<Object,Object>  getProcessor(String userId) {
        map.putIfAbsent(userId, EmitterProcessor.create().serialize());
        return map.get(userId);
    }

    public Collection< FluxProcessor<Object,Object>> getProcessors() {


        return map.values();
    }

    public void cleanProcessor(FluxProcessor<Object, Object > s) {
        map.entrySet()
                .removeIf(
                        entry -> (s
                                .equals(entry.getValue())));

    }
}
