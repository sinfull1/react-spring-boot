package connect.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // <2>
@AllArgsConstructor
@NoArgsConstructor
public class StockDao {

    private String stockName;
    private String stockCode;
    private Double stockPrice;




    public String toString() {
        return stockName + " " + stockCode + " " + stockPrice;
    }
}
