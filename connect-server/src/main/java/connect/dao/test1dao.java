package connect.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class test1dao {

    public final testdao testdao;

    @Autowired
    public test1dao(connect.dao.testdao testdao) {
        this.testdao = testdao;
        this.run();
    }

    public String run()
    {
        System.out.println(testdao.getid());
        return testdao.toString();
    }
}
