package connect.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data // <2>
@AllArgsConstructor
@NoArgsConstructor
public class SectorDao {

    private String sector;
    private List<StockDao> lisStocks;

    public String toString()
    {
        return sector + " " + lisStocks.toString();
    }
}
