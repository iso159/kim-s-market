package com.market.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.market.service.MemberServiceImpl;
import com.market.util.JSONResult;
import com.market.vo.Member;

@Component
public class AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
	@Autowired
	MemberServiceImpl memberServiceImpl;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {
		String id = authentication.getName();
		Member memberFromDB = memberServiceImpl.getById(id);
		LoginMemberInfo loginMemberInfo = new LoginMemberInfo();
		loginMemberInfo.setMemberId(memberFromDB.getMemberId());
		loginMemberInfo.setAuthority(memberFromDB.getAuthority());
		
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        MediaType jsonMimeType = MediaType.APPLICATION_JSON;
        response.setStatus(HttpServletResponse.SC_OK);
        
        JSONResult jsonResult = JSONResult.success(loginMemberInfo); 
        if (jsonConverter.canWrite(jsonResult.getClass(), jsonMimeType)) {
            jsonConverter.write(jsonResult, jsonMimeType, new ServletServerHttpResponse(response));
        }
	}
}
