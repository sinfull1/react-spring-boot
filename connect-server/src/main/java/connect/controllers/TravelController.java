package connect.controllers;

import connect.dao.SectorDao;
import connect.dao.Strategy;
import connect.generator.SectorGenerator;
import connect.model.travel.AirTravel;
import connect.model.travel.TravelRequest;
import connect.service.SectorGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.*;


@RestController

public class TravelController {

    private Random random = new Random();

    @PostMapping(value = "/getTravel")
    TreeSet< AirTravel> initialQuote(@RequestBody TravelRequest travelRequest) {
        TreeSet<AirTravel> air = new TreeSet<>(new AirTravelComp());
       for(int i=0;i<9;i++) {
           AirTravel airTravel = new AirTravel();
           airTravel.setOrigin(travelRequest.getOrigin());
           airTravel.setDestination(travelRequest.getDestination());
           ZonedDateTime dateTime = ZonedDateTime.parse(travelRequest.getTravelDate());
           airTravel.setTravelDate(dateTime.toLocalDate().toString());
           airTravel.setCarrier("SpiceJet");
           airTravel.setPrice(random.nextInt(2000));
           airTravel.setArrivalTime(new Timestamp(System.currentTimeMillis() + random.nextInt(3600) * 1000 * 4));
           airTravel.setDepartureTime(new Timestamp(System.currentTimeMillis()));
           air.add(airTravel);
       }
        return air;
    }


    public class AirTravelComp implements Comparator<AirTravel>
    {


        @Override
        public int compare(AirTravel o1, AirTravel o2) {
            return o1.getPrice()>o2.getPrice()?0:1;
        }
    }


}
