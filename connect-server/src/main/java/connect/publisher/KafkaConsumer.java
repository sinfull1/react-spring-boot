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
import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;


import connect.config.KafkaConfig;
import connect.dao.SectorDao;
import connect.processor.DistributedEventProcessor;
import io.github.resilience4j.core.functions.OnceConsumer;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.IntegerDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverRecord;
import reactor.kafka.receiver.internals.ConsumerFactory;

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
public class KafkaConsumer implements ApplicationListener<ApplicationStartedEvent> {

    AtomicInteger a = new AtomicInteger();

    static KafkaReceiver<Object, Object> kafkar = null;
    @Autowired
    DistributedEventProcessor distributedEventProcessor;

    public KafkaConsumer() {
        kafkar = KafkaReceiver.create(KafkaConfig.
                getReceiverOptions("latest","locking","lock-group"+ UUID.randomUUID().toString()));
        Flux.interval(Duration.ofSeconds(5),Duration.ofSeconds(20)).subscribe(t->{distributedEventProcessor
                .getSink().emitNext(ServerSentEvent.builder().event("heartbeat").data("message").build()
                        , Sinks.EmitFailureHandler.FAIL_FAST);});
        kafkar.receive().flatMap(map-> Mono.just((String)map.value()))
                .flatMap(value-> Mono.just( ServerSentEvent.<String> builder().event("lock-event")
                        .id(String.valueOf(a.getAndIncrement()))
                         .data(value).build()))
                .subscribe(k->distributedEventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST));
    }

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {

    }
}