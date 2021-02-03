package connect.model.travel;

import lombok.Data;

import java.util.Date;

@Data
public class TravelRequest {

    private String origin;
    private String destination;
    private String travelDate;
}
