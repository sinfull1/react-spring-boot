package connect.actuator;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.annotation.*;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.interceptor.SimpleKey;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.HashMap;

@Component
@Endpoint(id = "custom-endpoint")
public class CustomEndpoint{


    @Autowired
    private final CacheManager cacheManager;

    public CustomEndpoint(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @ReadOperation
    public String custom() {
        Cache hh = cacheManager.getCache("httpbin");
        System.out.print("accessiing ");
        SimpleKey s = new SimpleKey("1","2");
        return (String) hh.get(s).get();

    }

    @ReadOperation
    public String customEndPointByName(@Selector String name) {
        return "custom-end-point";
    }


    @WriteOperation
    public void writeOperation(@Selector String name) {
        //perform write operation
    }
    @DeleteOperation
    public void deleteOperation(@Selector String name){
        //delete operation
    }
}