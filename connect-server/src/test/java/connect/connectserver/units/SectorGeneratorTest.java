package connect.connectserver.units;

import connect.dao.SectorDao;
import connect.generator.SectorGenerator;
import connect.service.SectorGeneratorService;
import org.junit.Test;
import org.mockito.Mock;
import reactor.core.publisher.Flux;

public class SectorGeneratorTest {


    @Test
    public void testgenerator() {

        SectorGenerator sg = new SectorGenerator();
        SectorDao sd = sg.get();
        System.out.println(sd.toString());
        assert (sd != null);
    }


    @Test
    public void testflux() throws InterruptedException {
        SectorGeneratorService sectorGeneratorService = new SectorGeneratorService();
        Flux<SectorDao> sd = sectorGeneratorService.getQuotes();
        sd.subscribe(sectorDao -> System.out.println(sectorDao.toString()));
        Thread.sleep(2000);
    }
}
