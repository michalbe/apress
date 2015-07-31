'use strict';

/* global apress, module, test, ok */

module('Apress multiple callbacks to simple routing module');

test('should call multiple callbacks attached to the same route',
function(assert) {
  var done = assert.async();
  var status1 = false;
  var status2 = false;
  var route = '/foo';

  apress.addRoute(route, function(){
    status1 = true;
  });

  apress.addRoute(route, function(){
    status2 = true;
  });

  window.location.hash = '#!' + route;
  apress.hashTest();

  // something was wrong but async test resolves it
  setTimeout(function(){
    ok(status1, 'first listener fired');
    ok(status2, 'second listener fired');
    done();
  }, 0);
});

test('should remove just one callback if specified in the remove method',
function() {
  var status1 = false;
  var status2 = false;
  var route = '/foo';
  var cb1 = function(){
    status1 = true;
  };
  var cb2 = function(){
    status2 = true;
  };

  apress.addRoute(route, cb1);
  apress.addRoute(route, cb2);

  apress.removeRoute(route, cb1);

  window.location.hash = '#!' + route;
  apress.hashTest();

  ok(!status1, 'first listener doesn\'t fire');
  ok(status2, 'second listener fired');
});
