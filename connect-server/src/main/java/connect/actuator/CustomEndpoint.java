package connect.actuator;

import org.springframework.boot.actuate.endpoint.annotation.*;
import org.springframework.stereotype.Component;

@Component
@Endpoint(id = "custom-endpoint")
public class CustomEndpoint{

    @ReadOperation
    public String custom() {
        return "custom-end-point";
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