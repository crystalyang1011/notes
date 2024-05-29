(function(window){
  const App = window.App

  const Truck = App.Truck// 创建本地变量 Truck
  const DataStore = App.DataStore // 创建本地变量 DataStore

  const myTruck = new Truck('001',new DataStore())
  //由于myTruck是在main模块的函数内部声明（IIFT），
  //因此需要在main.js中将myTruck暴露到全局命名空间
  window.myTruck = myTruck



  




})(window)