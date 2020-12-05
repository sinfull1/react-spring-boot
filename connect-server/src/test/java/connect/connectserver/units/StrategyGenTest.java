package connect.connectserver.units;

import connect.dao.Strategy;

import org.junit.jupiter.api.Test;

public class StrategyGenTest {

    @Test
    public void test()
    {
        Strategy strategy = new Strategy();

        System.out.println(strategy.get().toString());
    }
}
