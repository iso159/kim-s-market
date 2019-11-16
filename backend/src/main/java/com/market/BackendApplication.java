package com.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.market.property.FileUploadProperties;


@SpringBootApplication
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class BackendApplication extends SpringBootServletInitializer{
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BackendApplication.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
