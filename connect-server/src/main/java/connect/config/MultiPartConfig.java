package connect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class MultiPartConfig {


        @Bean
        public CommonsMultipartResolver multipartResolver() {
            return new CommonsMultipartResolver();
        }


}
