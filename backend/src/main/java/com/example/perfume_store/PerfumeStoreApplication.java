package com.example.perfume_store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PerfumeStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(PerfumeStoreApplication.class, args);
	}

}
