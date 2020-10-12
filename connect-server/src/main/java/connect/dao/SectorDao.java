package connect.dao;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import connect.model.StockData;
import connect.serializer.StockDataSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Data // <2>
@AllArgsConstructor
@NoArgsConstructor
public class SectorDao {

    private String sector;
    @JsonSerialize(using= StockDataSerializer.class)
    private Mono<List<StockData>> stockFlux;

  //  public String toString() {
      //  return sector + " " + lisStocks.toString();
    //}
}
