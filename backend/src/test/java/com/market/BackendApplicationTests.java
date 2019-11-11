/**
 */
package com.market;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.market.service.CategoryService;
import com.market.service.MemberService;
import com.market.vo.Category;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BackendApplicationTests {
	
	@Autowired
	CategoryService cs;
	
	@Autowired
	MemberService ms;
	
	@Test
	public void categoryServiceTest() {
		Category category = new Category();
		category.setCategoryName("Mouse");
		category.setCategoryParents(1);
		category.setCreatorId("Jiwan");
	}
	
	@Test
	public void parsingTest() {
		String cp = "t";
		
		System.out.println(Integer.parseInt(cp));
	}
}
