package connect.dao;


import org.springframework.stereotype.Component;

@Component
public class testdao {

    public testdao()
    {
        System.out.println("constructed");
    }


    public int getid()
    {
        return this.hashCode();
    }
}
