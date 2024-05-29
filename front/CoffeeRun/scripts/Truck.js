(function(window){
  const App = window.App || {}

  function Truck(trunkId,db){// const truck = new App.Truck('001',new App.DataStore())
    console.log('running the Truck function');
    this.trunkId = trunkId
    this.db = db // DataStore
  }

  //truck.createOrder({
  //     email:'john@qq.com',
  //     coffee:'black coffee'
  // })
  Truck.prototype.createOrder = function(order){
    console.log('Adding order for '+order.email);
    this.db.add(order.email, order)
  }

  /**
   * 订单交付后，从数据库中删除相应的订单
   * @param customerId email
   */
  Truck.prototype.deliverOrder = function(customerId){
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId)
  }

  Truck.prototype.printOrders = function(){
    const customerIdArray = Object.keys(this.db.getAll())
    console.log('Truck # ' + this.trunkId + ' has pending orders: ')
    customerIdArray.forEach(function(item){
      console.log(this.db.get(item))//在forEach的回调函数中，因为他没有所有者，所以this报错undefined
      //使用bind设置this
      //调用bind出入truck实例，最后传给forEach
    }.bind(this))


    customerIdArray.forEach(function(item){
      console.log(this.db.get(item))//在forEach的回调函数中，因为他没有所有者，所以this报错undefined
      //除了bind外，还可以直接使用this
      //forEach还可以接受第二个参数，该参数会被当作回调函数中的this
    }.this)

    // customerIdArray.forEach((item)=>{
    //   console.log(this.db.get(item)) //此处不会报错
    // })
    /**
     * 在JavaScript中，普通的函数（function关键字定义的函数）有自己的this值，它的值取决于函数被调用的方式。而箭头函数则没有自己的this值，它会继承外层作用域的this值。
    在你的代码中，使用普通的函数作为forEach的回调函数时，this的指向会发生变化，导致在函数内部无法访问到Truck实例的db属性，从而报错undefined。
    而当你使用箭头函数作为forEach的回调函数时，箭头函数会继承外层作用域的this值，也就是Truck实例的this值（调用这个方法的Truck实例），因此可以正确访问到db属性，不会报错undefined。
    因此，使用箭头函数可以解决普通函数中this指向的问题，确保在函数内部可以正确访问到外部作用域的this值。
     */
  }

  App.Truck = Truck
  window.App = App
})(window)