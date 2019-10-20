package com.market.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.market.security.AuthFailureHandler;
import com.market.security.AuthLogoutSuccessHandler;
import com.market.security.AuthProvider;
import com.market.security.AuthSuccessHandler;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	AuthProvider authProvicer;
	
	@Autowired
	AuthFailureHandler authFailureHandler;
	
	@Autowired
	AuthSuccessHandler authSuccessHandler;
	
	@Autowired
	AuthLogoutSuccessHandler authLogoutSuccessHandler;
	
	@Override
	public void configure(WebSecurity web) throws Exception
	{
		web.ignoring()
			.antMatchers("/resources/**",
						 "/member/join",
						 "/categories")
			.antMatchers(HttpMethod.GET, 
					     "/items/**");
	}
	
	 @Override 
	 protected void configure(HttpSecurity http) throws Exception { 
		 //로그인 설정 
		 http.cors()
		 .and()
		 	.csrf().disable()
		 	.authorizeRequests() 
			 	// 권한별 URL 설정
		 		.antMatchers("/login").permitAll()
			 	.antMatchers("/member").hasAuthority("USER")
			 	.antMatchers(HttpMethod.POST, "/items").hasAuthority("SELLER")
			 	.antMatchers("/admin").hasAuthority("ADMIN")
			 	.anyRequest().authenticated()
		 .and()
		 	.formLogin()
		 	.failureHandler(authFailureHandler)
		 	.successHandler(authSuccessHandler)
		 .and() 
			// 로그아웃 관련 설정
			.logout()
			.logoutSuccessHandler(authLogoutSuccessHandler)
		.and()
			.authenticationProvider(authProvicer);
	 }
	 
	 @Bean
     @Override
     public AuthenticationManager authenticationManagerBean() throws Exception {
          return super.authenticationManagerBean();
     }
	 
	 @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
