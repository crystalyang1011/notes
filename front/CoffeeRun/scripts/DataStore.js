// 在ES5中JavaScript的对象体系，不是基于class的，而是基于构造函数（constructor）和原型链（prototype）。 
// 在ES6才引入了class这个概念。

(function(window){
  //用一个对象来作为CoffeeRun的命名空间，这个命名空间是各个模块注册的地方，这样他们便可以被其他应用代码所调用
  //建立命名空间步骤
  //1.如果命名空间已经存在，获取它的引用
  //2.创建模块代码
  //3.将模块代码绑定到命名空间上
  const App = window.App || {}//window的App属性，我们接下来编写的每一个模块都会做相似的检验，就好比“无论谁是第一个，创建一个新对象让其余人使用”
  function DataStore(){// 构造函数
    console.log('running the DataStore function');
      //this指向当前实例
    this.data = {}// 通过this.data创建一个data属性，并且分配给他一个空对象
  }
  //new告知JS创建一个新对象，将this指向新对象，然后隐式返回该对象。
  //这意味着即便不在构造函数中使用return语句，他依然可以return一个对象
  //接下来在控制台创建对象/实例
  //const dsOne = new App.DataStore()
  //dsOne.data['email'] = 'sample01@qq.com'
  //dsOne.data['order'] = 'black coffee'

  //原型属性：用于与数据交互（创建，删除，检索。。。），这些方法是其他组件和DataStore实例交互的方式
  //函数在JS中也是对象，这意味着它们有属性
  //所有通过构造函数创建的实例都可以访问其属性和方法的共享仓库：构造函数的prototype属性
  //new不仅创建并返回实例，还在实例和构造函数的prototype属性间建立了一个特别的链接

  DataStore.prototype.add = function(key,val) {
    this.data[key]= val
  }
  //为DataStore.prototype添加了add属性，并赋值为一个函数
  //const dsOne = new App.DataStore()
  //dsOne.add('email','john@qq.com')
  //dsOne.add('order','coffee')


  DataStore.prototype.get = function(key) {
    return this.data[key]
  }
  DataStore.prototype.getAll = function() {
    return this.data
  }

  DataStore.prototype.remove = function(key) {
    delete this.data[key]
  }


  App.DataStore = DataStore//将DataStore绑定到App对象上
  window.App = App//然后将新修改的App赋值到全局App属性上
  //接下来需要在浏览器的命令行输入App.DataStore()来调用DataStore函数
})(window)