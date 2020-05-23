package connect.dao;

import java.util.HashMap;
import java.util.Random;
import java.util.function.Supplier;

public class Strategy implements Supplier<HashMap<String, Integer>> {

    public static int getRandomIntegerBetweenRange(int min, int max) {
        int x = (int) (Math.random() * ((max - min) + 1)) + min;
        return x;
    }

    @Override
    public HashMap<String, Integer> get() {
        HashMap<String, Integer> map = new HashMap<>();
        Random r = new Random();
        for (String stock : StockSymbols.symList) {
            map.put(stock, r.nextInt(50) * getRandomIntegerBetweenRange(-2, 2));

        }
        return map;
    }
}


