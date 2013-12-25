var concat = require('../')
var test = require('tape')

test('string -> buffer stream', function (t) {
  t.plan(2)
  var strings = concat(function(out) {
    t.ok(Buffer.isBuffer(out))
    t.equal(out.toString('utf8'), 'nacho dogs')
  })
  strings.write("nacho ")
  strings.write("dogs")
  strings.end()
})

test('string stream', function (t) {
  t.plan(2)
  var strings = concat({ encoding: 'string' }, function(out) {
    t.equal(typeof out, 'string')
    t.equal(out, 'nacho dogs')
  })
  strings.write("nacho ")
  strings.write("dogs")
  strings.end()
})

test('end chunk', function (t) {
  t.plan(1)
  var endchunk = concat({ encoding: 'string' }, function(out) {
    t.equal(out, 'this is the end')
  })
  endchunk.write("this ")
  endchunk.write("is the ")
  endchunk.end("end")
})
