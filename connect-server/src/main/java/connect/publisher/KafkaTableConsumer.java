/*
 * Copyright (c) 2016-2018 Pivotal Software Inc, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package connect.publisher;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Consumer;


import connect.config.KafkaConfig;
import connect.processor.TableProcessor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.IntegerDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.metrics.ApplicationStartup;
import org.springframework.stereotype.Component;
import reactor.core.Disposable;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.KafkaReceiver;

/**
 * Sample consumer application using Reactive API for Kafka.
 * To run sample consumer
 * <ol>
 *   <li> Start Zookeeper and Kafka server
 *   <li> Send some messages to the topic, e.g. by running {@link KafkaConsumer}
 *   <li> Run {@link KafkaConsumer} as Java application with all dependent jars in the CLASSPATH (eg. from IDE).
 *   <li> Shutdown Kafka server and Zookeeper when no longer required
 * </ol>
 */
@Component
public class KafkaTableConsumer implements ApplicationListener<ApplicationStartedEvent> {


    static KafkaReceiver<Object, Object> kafkar = null;
    HashMap<String, String> temp = new HashMap<>();
    private final String uid = UUID.randomUUID().toString();
    private Disposable d ;

    public HashMap<String, String> consume() {
        d.dispose();
         d = kafkar.receive().flatMap(map -> Mono.just((String) map.value()))
                .subscribe(new Splitter());
        return temp;
    }


    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        kafkar = KafkaReceiver.create(KafkaConfig.getReceiverOptions("earliest",
                "locking-2","lock-group-2"+UUID.randomUUID().toString()));
        d =kafkar.receive().flatMap(map -> Mono.just((String) map.value()))
                .doOnNext(new Splitter()).subscribe();

    }


    public class Splitter implements Consumer<String>
    {
        @Override
        public void accept(String k) {
            try{
                temp.put( k.split(":")[0], k.split(":")[1]);
            }
            catch(Exception e){

            }


        }
    }

}