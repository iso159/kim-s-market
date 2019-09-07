package com.market.encrypt;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class PasswordEncryptTest {
	
	BCryptPasswordEncoder cryptPasswordEncoder = new BCryptPasswordEncoder();
	
	@Test
	public void passwordEncryptTest() {
		String password = "1234";
		String encryptPassword = cryptPasswordEncoder.encode(password);
		
		System.out.println("ENCRYPT PASSWORD : " + encryptPassword);
	}
	
	@Test
	public void passwordMatchTest() {
		String password = "1234";
		String encryptPassword = cryptPasswordEncoder.encode(password);
		
		boolean flag = cryptPasswordEncoder.matches(password, encryptPassword);
		
		if(flag) {
			System.out.println("두 패스워드가 일치합니다.");
		} else {
			System.out.println("두 패스워드가 일치하지 않습니다.");
		}
	}

}
