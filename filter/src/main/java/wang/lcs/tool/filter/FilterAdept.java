/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wang.lcs.tool.filter;

/**
 *
 * @author changshu.li
 */
public abstract class FilterAdept<T> implements Filter<T> {

	@Override
	public void init() {
	}

	@Override
	public void doFilter(T o, FilterChain chain) {
	}

	@Override
	public void destroy() {
	}
}
