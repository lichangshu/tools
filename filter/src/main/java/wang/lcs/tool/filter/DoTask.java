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
public interface DoTask<T> {

	public void service(T o);
}
