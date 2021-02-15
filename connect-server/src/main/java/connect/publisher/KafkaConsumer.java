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


import connect.processor.DistributedEventProcessor;
import io.github.resilience4j.core.functions.OnceConsumer;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.IntegerDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
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
 *   <li> Update {@link #BOOTSTRAP_SERVERS} and {@link #TOPIC} if required
 *   <li> Create Kafka topic {@link #TOPIC}
 *   <li> Send some messages to the topic, e.g. by running {@link KafkaConsumer}
 *   <li> Run {@link KafkaConsumer} as Java application with all dependent jars in the CLASSPATH (eg. from IDE).
 *   <li> Shutdown Kafka server and Zookeeper when no longer required
 * </ol>
 */
@Component
public class KafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(KafkaConsumer.class.getName());

    private static final String BOOTSTRAP_SERVERS = "http://ec2-13-232-52-62.ap-south-1.compute.amazonaws.com:9092";
    private static final String TOPIC = "lock-status";

    private final ReceiverOptions<Integer, String> receiverOptions;
    private final SimpleDateFormat dateFormat;
    ReceiverOptions<Integer, String> options = null;
    static KafkaReceiver<Integer, String> kafkar = null;
    @Autowired
    DistributedEventProcessor distributedEventProcessor;

    public KafkaConsumer() {

        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        props.put(ConsumerConfig.CLIENT_ID_CONFIG, "user");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "new-group");
      //  props.put( ConsumerConfig.GROUP_INSTANCE_ID_CONFIG, "lldldl");

        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, IntegerDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
      //    props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG,"10000");
        // props.put(ConsumerConfig.HEARTBEAT_INTERVAL_MS_CONFIG,"500");
        receiverOptions = ReceiverOptions.create(props);
        dateFormat = new SimpleDateFormat("HH:mm:ss:SSS z dd MMM yyyy");
        options = receiverOptions.subscription(Collections.singleton(TOPIC))
                .addAssignListener(partitions -> log.debug("onPartitionsAssigned {}", partitions))
                .addRevokeListener(partitions -> log.debug("onPartitionsRevoked {}", partitions));
              //  .pollTimeout(Duration.ofMillis(1000));

        kafkar = KafkaReceiver.create(options);
        kafkar.receive().flatMap(map-> Mono.just(map.value()))
                .doOnNext(k->distributedEventProcessor.getSink().emitNext(k, Sinks.EmitFailureHandler.FAIL_FAST))
                .subscribe();
    }

    public static Flux<ReceiverRecord<Integer, String>> consumeMessages() {
        return kafkar.receive();
    }
}