package connect.dao;

import java.util.HashMap;
import java.util.Random;

public class Strategy {

    public static HashMap<String, Integer> eqStrat() {
        HashMap<String, Integer> map = new HashMap<>();
        Random r = new Random();
        for (String stock : StockSymbols.symList) {
            map.put(stock, r.nextInt(50) * getRandomIntegerBetweenRange(-2, 2));

        }
        return map;
    }


    public static int getRandomIntegerBetweenRange(int min, int max) {
        int x = (int) (Math.random() * ((max - min) + 1)) + min;
        return x;
    }

}


