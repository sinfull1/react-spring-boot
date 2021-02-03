package connect.model.travel;

import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Data
public class AirTravel {

    private String origin;
    private String destination;
    private String travelDate;
    private Timestamp departureTime;
    private Timestamp arrivalTime;
    private int price;
    private String carrier;
}
