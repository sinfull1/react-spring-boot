package connect.connectserver.units;

import org.junit.jupiter.api.Test;

public class SectorGeneratorTest {

    public void childrenNames(String... names) {
        for(int i= 0; i < names.length; i++)
            System.out.println(names[i]);

    }
    @Test
    public void testgenerator() {
     String g = "gg" + null;
     System.out.println(g.length());
        childrenNames();
        childrenNames("Jane");
        childrenNames("Jane", "Tom", "Peter");

    }


    @Test
    public void testflux() throws InterruptedException {
    }
}
