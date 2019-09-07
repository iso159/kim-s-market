package com.market.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashUtil {
	static final BCryptPasswordEncoder cryptPasswordEncoder = new BCryptPasswordEncoder();
	
	public static String passwordEncryptor(String password) {
		String encryptPassword = cryptPasswordEncoder.encode(password);
		return encryptPassword;
	}
	
	public static boolean passwordMatch(String password, String encryptPassword) {
		boolean matchResult = cryptPasswordEncoder.matches(password, encryptPassword);
		return matchResult;
	}
}
