/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wang.lcs.tool.filter;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author changshu.li
 */
public class FilterChainFactoryTest {

	public FilterChainFactoryTest() {
	}

	@Test
	public void testCreate() {
		System.out.println("create");
		FilterChainFactory<MyData> instance = new FilterChainFactory<MyData>(new MyTask(), new NameNotBlankFilter(), new NameLengthBigerSizeFilter());
		MyData d = new MyData("zhangsan");
		instance.create().start(d);
		assertTrue(d.isSuccess());
		d = new MyData("lisi");
		instance.create().start(d);
		assertFalse(d.isSuccess());
	}

	public static class MyData {

		private final String name;
		private boolean success;

		public MyData(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public boolean isSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

	}

	public static class MyTask implements DoTask<MyData> {

		public void service(MyData o) {
			System.out.println("Success ! " + o.getName());
			o.setSuccess(true);
		}

	}

	public static class NameNotBlankFilter extends FilterAdept<MyData> {

		@Override
		public void doFilter(MyData o, FilterChain chain) {
			if (o.getName() != null && o.getName().trim().length() > 0) {
				chain.doFilter(o);
			}
		}
	}

	public static class NameLengthBigerSizeFilter extends FilterAdept<MyData> {

		@Override
		public void doFilter(MyData o, FilterChain chain) {
			if (o.getName().length() > 6) {
				chain.doFilter(o);
			}
		}
	}
}
