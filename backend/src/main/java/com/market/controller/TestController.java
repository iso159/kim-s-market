package com.market.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.market.vo.Member;
import com.market.vo.GenericObject;

@RestController
public class TestController {

	@RequestMapping(value = "/test", method = RequestMethod.POST)
	public void test(@RequestBody GenericObject<Member> test) {
		System.out.println(test);
	}
}
