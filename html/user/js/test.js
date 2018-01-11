'use strict';
var obj = {
    foo: 'bar'
  }
  
  Object.freeze(obj)
  
  new Vue({
    el: '#change_on_time',
    data () {
      return {
        obj
      }
    }
  })
