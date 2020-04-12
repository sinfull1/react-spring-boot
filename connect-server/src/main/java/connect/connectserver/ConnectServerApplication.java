package connect.connectserver;

import connect.service.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@SpringBootApplication
@ComponentScan(basePackages = "connect.controllers")
public class ConnectServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConnectServerApplication.class, args);
	}



}
