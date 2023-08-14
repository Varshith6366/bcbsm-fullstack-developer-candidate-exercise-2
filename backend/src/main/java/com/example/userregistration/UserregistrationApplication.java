package com.example.userregistration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class UserregistrationApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(UserregistrationApplication.class, args);
	}


}
