/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wang.lcs.tool.filter;

/**
 *
 * @author changshu.li
 * @param <T>
 */
public interface Filter<T> {

	public void init();

	public void doFilter(T o, FilterChain chain);

	public void destroy();
}
