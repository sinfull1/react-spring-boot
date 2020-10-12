package connect.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class DerivateData {

    @JsonProperty("info")
    private Info info;

    @JsonProperty("stocks")
    private List<Stocks> stocks;

    @JsonProperty("strikePrices")
    private List<Integer> strikePrices;

    @JsonProperty("expiryDates")
    private List<String> expiryDates;


    @Data
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

        private String identifier;


    }

    @Data
    public static class Filter {
        private String instrumentType;

        private String expiryDate;

        private String optionType;

        private String strikePrice;


    }

    @Data
    public static class Metadata {
        private String instrumentType;

        private String expiryDate;

        private String optionType;

        private int strikePrice;

        private String identifier;

        private double openPrice;

        private double highPrice;

        private double lowPrice;

        private double closePrice;

        private double prevClose;

        private double lastPrice;

        private double change;

        private double pChange;

        private int numberOfContractsTraded;

        private double totalTurnover;


    }

    @Data
    public static class Bid {
        private double price;

        private int quantity;

    }

    @Data
    public static class Ask {
        private int price;

        private int quantity;

    }

    @Data
    public static class Price {
        private double bestBuy;

        private int bestSell;

        private double lastPrice;

    }

    @Data
    public static class Carry {
        private double bestBuy;

        private double bestSell;

        private double lastPrice;

    }

    @Data
    public static class CarryOfCost {
        private Price price;

        private Carry carry;

    }

    @Data
    public static class TradeInfo {
        private int tradedVolume;

        private double value;

        private double vmap;

        private double premiumTurnover;

        private int openInterest;

        private int changeinOpenInterest;

        private double pchangeinOpenInterest;

        private int marketLot;

     }

    @Data
    public static class OtherInfo {
        private double settlementPrice;

        private double dailyvolatility;

        private double annualisedVolatility;

        private int impliedVolatility;

        private int clientWisePositionLimits;

        private int marketWidePositionLimits;


    }

    @Data
    public static class MarketDeptOrderBook {
        private int totalBuyQuantity;

        private int totalSellQuantity;

        @JsonProperty("bid")
        private List<Bid> bid;

        @JsonProperty("ask")
        private List<Ask> ask;

        @JsonProperty("carryOfCCost")
        private CarryOfCost carryOfCost;

        @JsonProperty("tradeInfo")
        private TradeInfo tradeInfo;

        @JsonProperty("otherInfo")
        private OtherInfo otherInfo;


    }

    @Data
    public static class Stocks {
        @JsonProperty("metadata")
        private Metadata metadata;

        private int underlyingValue;

        private int volumeFreezeQuantity;

        @JsonProperty("marketDeptOrderBook")
        private MarketDeptOrderBook marketDeptOrderBook;


    }


}
