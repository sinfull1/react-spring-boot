package connect.controllers;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = {"*"})
@RestController
@CacheConfig(cacheNames = {"httpbin"})
public class HttpBinController {


}
