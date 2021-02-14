package connect.controllers;

import connect.dao.Description;
import connect.service.HttpBinService;
import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterConfig;
import io.github.resilience4j.ratelimiter.RateLimiterRegistry;
import io.vavr.CheckedRunnable;
import io.vavr.control.Try;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.concurrent.Callable;
import java.util.function.Function;



@RestController

public class HttpBinController {


    @Autowired
    HttpBinService httpBinService;
    RateLimiterConfig config = RateLimiterConfig.custom().timeoutDuration(Duration.ofSeconds(20))
            .limitRefreshPeriod(Duration.ofMillis(100)).limitForPeriod(200).build();
    RateLimiterRegistry registry = RateLimiterRegistry.of(config);
    RateLimiter rateLimiter = registry.rateLimiter("my");


    @GetMapping(value = "/getMapping")
    public Mono<String> get() throws Exception {
        Callable<Mono<String>> restrictedCall = RateLimiter
                .decorateCallable(rateLimiter, () -> httpBinService.getHttpbin("1", "2"));
        return Try.ofCallable(restrictedCall).get();

    }

}


