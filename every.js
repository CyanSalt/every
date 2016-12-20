const EveryUnitGetter = unit => {
	return function() {
		this.unit = unit
		return this
	}
}
const EveryNameProxy = () => {
	return function() {
		return new Proxy(this, {
			get: (target, key) => {
				target.name = key
				Every[key] = target
				return target
			}
		})
	}
}
const EveryMeta = value => {
	return Object.create({
		constructor: EveryMeta,
		do: function(handler) {
			this.handler = handler
			return this
		}
	}, {
		interval: {
			value: parseFloat(value)
		},
		run: {
			get: function() {
				const unit = {'ms': 1, 's': 1000}
				this.id = setInterval(this.handler, this.interval * unit[this.unit || 1])
				return this
			}
		},
		stop: {
			get: function() {
				this.id && clearInterval(this.id)
				return this
			}
		},
		named: {get: EveryNameProxy()},
		ms: {get: EveryUnitGetter('ms')},
		msec: {get: EveryUnitGetter('ms')},
		msecs: {get: EveryUnitGetter('ms')},
		millisecond: {get: EveryUnitGetter('ms')},
		milliseconds: {get: EveryUnitGetter('ms')},
		s:  {get: EveryUnitGetter('s')},
		sec: {get: EveryUnitGetter('s')},
		secs: {get: EveryUnitGetter('s')},
		second: {get: EveryUnitGetter('s')},
		seconds: {get: EveryUnitGetter('s')},
	})
}

let BaseEvery = value => EveryMeta(value)

let Every = every = new Proxy(BaseEvery, {
	get: (target, key) => {
		const regex = /.??(\d+(?:.\d+)?)/
		let match = key.match(regex)
		if (match) {
			return target(match[1])
		} else {
			return target[key]
		}
	}
})
