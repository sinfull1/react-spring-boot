package connect.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class StockData {

    @JsonProperty("info")
    private Info info;

    @JsonProperty("securityInfo")
    private SecurityInfo securityInfo;

    @JsonProperty("priceInfo")
    private PriceInfo priceInfo;

   // @JsonSerialize(using=DerivateDataSerializer.class)
    private DerivateData derivateData;



    @Data
    @Getter
    public static class Info {
        private String symbol;

        private String companyName;

        private String industry;

        private List<String> activeSeries;

        private List<String> debtSeries;

        private List<String> tempSuspendedSeries;

        private boolean isFNOSec;

        private boolean isCASec;

        private boolean isSLBSec;

        private boolean isDebtSec;

        private boolean isSuspended;

        private boolean isETFSec;

        private boolean isDelisted;

        private String isin;

        private boolean isTop10;

        private String identifier;

    }

    @Data
    public static class Metadata {
        private String series;

        private String symbol;

        private String isin;

        private String status;

        private String listingDate;

        private String industry;

        private String lastUpdateTime;

        private double pdSectorPe;

        private int pdSymbolPe;

        private String pdSectorInd;


    }

    @Data
    public static class SecurityInfo {
        private String boardStatus;

        private String tradingStatus;

        private String tradingSegment;

        private String sessionNo;

        private String slb;

        private String classOfShare;

        private String derivatives;

        private String surveillance;

        private int faceValue;

        private long issuedCap;


    }

    @Data
    public static class IntraDayHighLow {
        private double min;

        private double max;

        private double value;


    }

    @Data
    public static class WeekHighLow {
        private double min;

        private String minDate;

        private double max;

        private String maxDate;

        private double value;


    }

    @Data
    public static class PriceInfo {
        private double lastPrice;

        private double change;

        private double pChange;

        private double previousClose;

        private double open;

        private double close;

        private double vwap;

        private String lowerCP;

        private String upperCP;

        private String pPriceBand;

        private double basePrice;

        @JsonProperty("intraDayHighLow")
        private IntraDayHighLow intraDayHighLow;

        private WeekHighLow weekHighLow;


    }

    @Data
    public static class Preopen {
        private double price;

        private int buyQty;

        private int sellQty;


    }

    @Data
    public class Ato {
        private int buy;

        private int sell;


    }

    @Data
    public static class PreOpenMarket {
        private List<Preopen> preopen;

        private Ato ato;

        private double IEP;

        private int totalTradedVolume;

        private double finalPrice;

        private int finalQuantity;

        private String lastUpdateTime;

        private int totalBuyQuantity;

        private int totalSellQuantity;

        private int atoBuyQty;

        private int atoSellQty;


    }

    @Data
    public static class Root {
        private Info info;

        private Metadata metadata;

        private SecurityInfo securityInfo;

        private PriceInfo priceInfo;

        private PreOpenMarket preOpenMarket;


    }
}
