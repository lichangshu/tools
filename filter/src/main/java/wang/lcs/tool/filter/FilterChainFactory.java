/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wang.lcs.tool.filter;

/**
 * 該类是非线程安全的
 *
 * @author changshu.li
 * @param <T>
 */
public class FilterChainFactory<T> {

	private final Filter[] filters;
	private final DoTask doTask;

	public FilterChainFactory(DoTask<T> doTask, Filter<T>... filters) {
		if (filters == null) {
			filters = new Filter[]{};
		}
		this.filters = filters;
		this.doTask = doTask;
	}

	/**
	 * FilterChain 非线程安全的
	 *
	 * @return
	 */
	public FilterChain<T> create() {
		return new FilterChain<T>() {
			private int index = -1;

			@Override
			public void doFilter(T o) {
				index++;
				if (index == filters.length) {
					doTask.service(o);
				}
				if (index < filters.length) {
					Filter ff = filters[index];
					ff.init();
					ff.doFilter(o, this);
					ff.destroy();
				}
			}

			@Override
			public void start(T o) {
				doFilter(o);
			}
		};
	}
}
