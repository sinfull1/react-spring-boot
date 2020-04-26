package connect.connectserver.units;

import connect.dao.SectorDao;
import connect.generator.SectorGenerator;
import connect.service.SectorGeneratorService;
import org.junit.Test;
import reactor.core.publisher.Flux;

public class SectorGeneratorTest {


    @Test
    public void testgenerator() {

        SectorGenerator sg = new SectorGenerator();
        SectorDao sd = sg.generateSectorQuote();
        System.out.println(sd.toString());
        assert (sd != null);
    }


    @Test
    public void testflux() throws InterruptedException {
        Flux<SectorDao> sd = SectorGeneratorService.getQuotes();
        sd.subscribe(sectorDao -> System.out.println(sectorDao.toString()));
        Thread.sleep(2000);
    }
}
