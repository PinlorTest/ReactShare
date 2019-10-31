# React-Redux 交流分享

### 介绍

Redux 是一个状态管理工具。他来源于 FB 的另一个开源状态管理库 Flux。
由于 React 采用的是数据从上而下单方面传递的思想，保证每个状态都是可追溯的。但是有些时候项目体积大，对于数据操作频繁且复杂的情况下接入Redux 是一个很好的选择。



### Redux 的三大原则

#### 1，单一数据源

​	**整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。**

#### 2，state 是只读的

​	**唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。**

#### 3，使用纯函数来执行修改

​	**为了描述 action 如何改变 state tree ，你需要编写 reducers。**



其实对于三大原则的理解也很简单。

单一数据源是指：我觉得这个原则是为了区分 Flux的。因为Flux的设计思想是多个 Store 。导致在使用的时候发生了什么数据改变以及追溯上的问题。相对于 mobx 也是。对于 Store 我们可以理解为一个 对象，当我们在项目中 使用 `createStore()` 方法去创建了这个 store 实例。

state 是只读的： store 中的数据是只读的，我们不能在项目中对数据进行直接修改 形似 `this.props.show = false` ，当然这个属性 show 是来自 store 中的数据，不是父组件传递下来的。我们可以在项目中的任何一个组件中 通过 `store.getState()` 方法去获取 当前store中的所有state，注意是当前，也就是说 如果你是在 index.js 里面 `store.getState()` 那么获取的只是你 reduer 里面定义的 initialState。

使用纯函数来执行修改：这个原则就是基于上一个 state 是只读的。如果state 是只读的不能进行修改。那么我们怎样去修改 store 中的数据呢。redux 的作者不知道是怎么想的，想出一个方法。使用纯函数去修改 store 里面的数据。这里我简单说下 修改的步骤：



1，定义 action 常量，和 actionCreator

```javascript
const SHOW_MODAL = 'SHOW_MODAL'

const payload = { show: true }
export function modalShowAC (payload){
  return {
    type: SHOW_MODAL,
    payload
  }
}
```

2，写Reducer

```javascript

const initialState = {
  show: false
}
function ModalShowRC(state=initialState,action){
  switch(action.type){
      case: SHOW_MODAL
      	return {...state, ...action.payload}
  		default:
  			return state
  }
}
```

这样在页面里面就可以直接 `import { modalShowAC } from '../action'` 去使用了，关于使用的方式其实也可以根据自己的习惯来。有的人喜欢在 connect 的时候 会定义 mapDispatchToProps 用redux 的这个 方法去关联然后再在代码里去`this.props.dispatch(modalShowAC())` 。有的人喜欢直接在 代码里  直接 `store.dispatch( modalShowAC() )` 根据自己的习惯就好。

这一套逻辑的整体思路就是   定义一个 actionCreator 就是一个方法，这个方法返回一个对象，这个对象第一个属性是 action.type  匹配 reducer 里面的 switch 。第二个属性就是我们要传入的 改变 state 的数据了。

一般我们会遇到什么需求呢，就是把请求到的数据发送到store，我们把获取到的数据当做 payload 传进 actionCreator的方法里面。 

```javascript
const isShow = {show:true} //计算得到或者请求得到
store.dispatch(modalShowAC(isShow))
```

连接store 的方法  

```javascript   
const wrapIndex = connect(state =>({
	value:state.reducerName.value
}))(index)
```


对于Reducer 和Action 的取名统一一下： reducer 统一以RC 结尾，action 统一以 AC 结尾。

以上就是Redux 的简单用法。



## 进阶

下面说点 Redux 的中间件吧。关于为什么会用到中间件，其实我们想一下就能了解了，例如我们有这样一个需求：一个借口多个地方调用，参数不同返回数据不同但是每次调用之后我们需要把数据 发送到 store 里面。

如果我们是按照上面的简单用法的话就会需要在每个地方都写接口然后 `store.dispatch()` 发送数据。但是如果我们把 发送请求的接口写到 actionCreator 里面呢。这样我们只需要在需要调用这个借口的地方 dispatch 这个接口的参数就行了。

由于Redux 三大原则的影响，所有的东西都是可预测的。所以想要实现这样的方式 我们需要加入 redux-thunk 中间件（对于中间件我们后续再详细研究）。加入中间件之后我们就能这样操作了。

下面是一个实例

```javascript
export function fetchAddrList (status) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Tool.post('/wechat/address/list', {status}, (rsp) => {
        if (rsp.status) {
          resolve(rsp.result.items);
          dispatch(updateAddrList(rsp.result.items));
        } else {
          reject(rsp);
          alert(rsp.result.msg);
        }
      });
    });
  };
}
```

关于什么redux-saga dva 都是redux 的另外一种写法。只要会了基本的写法，看下API就能照着写了。



**Redux 不是必须的，You Might Not Need Redux ** 这句话是Redux 的作者 Dan Abramov 说的。

所以在项目中 如果是能用state 的就尽量使用 state。从性能方面还是代码体积方面都比 Redux 要好。

```javascript
//使用state
this.state = {
  show:false
},
handleShowModal = () =>{
  this.setState({show:true})
}
//这样一个对于是否显示一个modal的逻辑，我们使用state，响应很快。而且当组件销毁的时候 state 也被销毁了。

//如果是使用Redux的话，需要绕一大圈。我们把 状态发送到store，然后用connect 链接组件 获取到 state的show 然后再去渲染组件。
```

但是对于公司的几个项目来说 我觉得使用redux 是好的，就拿 ISM 来说很多地方都是添加删除，然后Modal 弹出一层一层的创建。对于Modal 我们一般都是封装的。那么到最后拿到所有数据提交就有些麻烦了，使用了Redux 之后 我们把每步的操作都发送到 store 里面。最后提交的时候取出来。


我们可以简单的去猜一下 store 的机制

```javascript
	//其实 store 就是 createStore 的实例，dispatch和 getState 都是 createStore 里面的方法
	function createStore(args){
		dispatch:function(){},
		getState:function(){
			return state
		}
	}
	const store = createStore()		//创建一个 store 的实例，
	const state = store.getState()	//调用store 实例上的方法 获取当前的所有state
	//state 其是就是一个对象，他的每个属性都是一个 reducer 的名字 `function changeValueRD(){}`
	state : {
		changeValueRD:{
			value: 1
		}
	}
	
	
``` 
