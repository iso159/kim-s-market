package com.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

import com.market.property.FileUploadProperties;


@SpringBootApplication
@ComponentScan(basePackages = "com.market")
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class BackendApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
