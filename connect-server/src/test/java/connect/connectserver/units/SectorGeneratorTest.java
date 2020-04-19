package connect.connectserver.units;

import connect.dao.SectorDao;
import connect.generator.SectorGenerator;
import org.junit.Test;
import reactor.core.publisher.Mono;

public class SectorGeneratorTest {


    @Test
    public void testgenerator() {

        SectorGenerator sg = new SectorGenerator();
        SectorDao sd = sg.generateSectorQuote();

        assert (sd != null);

    }
}
