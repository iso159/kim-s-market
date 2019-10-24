package com.market.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;

@Component
public class MyBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint{
	
	@Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authEx) 
    					throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        
        Gson gson = new Gson();
        String json = gson.toJson(new ResponseEntity<String>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED));
        writer.println(json);
        writer.flush();
    }
	
	@Override
    public void afterPropertiesSet() throws Exception {
        setRealmName("Kim's Market");
        super.afterPropertiesSet();
    }
}
