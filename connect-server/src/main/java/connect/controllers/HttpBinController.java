package connect.controllers;

import connect.processor.EventProcessor;
import org.reactivestreams.Subscriber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.util.function.Tuple2;

import java.time.Duration;


@CrossOrigin(origins = {"*"})
@RestController
@CacheConfig(cacheNames = {"httpbin"})
public class HttpBinController {




}
