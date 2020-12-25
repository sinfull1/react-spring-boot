package connect.connectserver.units;

import connect.dao.SectorDao;
import connect.generator.SectorGenerator;
import connect.service.SectorGeneratorService;

import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;

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
