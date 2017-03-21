//Html !!
//   <div id="container"></div><div id="container2"></div>
window.data = {size:0, components:[]};
var Hello = React.createClass({
  //state:{}, //该属性设置不起作，会被 getInitialState 覆盖，如果没有 getInitialState 方法，其值会是 null 
  t:0,//自定义属性
  ch:function(){console.log("click");this.setState({i:this.state.i + 1});},
  getDefaultProps:function(){ console.log("getDefaultProps"); return {}; },
  getInitialState:function(){ console.log("init"); return {i:0,same:"null"}; },
  componentWillMount:function(){//调用一次且只一次
    window.data.components[window.data.size] = this;// 用于测试 两个ReactDOM是否是一个值
    console.log("componentWillMount");
    window.data.size = window.data.size + 1;
  },
  componentWillUpdate:function(){//第一次挂载的时候不会执行
    console.log("componentWillUpdate");
  },
  shouldComponentUpdate:function(){//第一次挂载的时候不会执行
    console.log("shouldComponentUpdate"); return true;
  },
  render: function() {//不可调用 setState() 方法，否则会死循环 !!
    console.log("render");
    if(window.data.components.length > 1){// 两个 DOM component 没有任何相同的引用!!!
      this.state.same = window.data.components[0].ch == window.data.components[1].ch;
    }
    var sm = React.DOM.span({}, " Fun is same:" + this.state.same);
    this.t = this.t+1;
    var span = <span> Hello {this.props.name}! T:[{this.t}], state.i:[{this.state.i}]</span>;
    return React.DOM.div({onClick:this.ch}, span, sm);
  },
  componentDidUpdate:function(){console.log("componentDidUpdate");},//第一次挂载的时候不会执行
  componentDidMount:function(){console.log("componentDidMount");},
  componentWillReceiveProps:function(){alert("componentWillReceiveProps");}, // 未知如何修改propes！因为推荐为只读，所以这行代码从没执行过
  componentWillUnmount:function(){alert(1);} // 未知什么代码可以卸载！所以这行代码从没执行过
});
var hello = <Hello name="World" />;
ReactDOM.render(
  hello, document.getElementById('container')
);
ReactDOM.render(
  hello, document.getElementById('container2')
);
// 注意: hello 变量生成的 component 没有任何关系，即使是函数的引用也不相同 !!!
