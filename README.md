# Every.js

Javascript library for timed tasks

### How to use

```javascript

let handler = () => {
	console.log('test')
}

every. x10. seconds.
named. Task.
do (handler).
run

every. Task.
stop

```

**Update 2016/12/23**

Now you can use like this:

```javascript

let handler = Task => {
	console.log('test')
}

every. x10. seconds.
do (handler).
run

every. Task.
stop

```

So cool!
