const pad0 = value => {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.running = false;
		this.state = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	};

	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		};
	};

	calculate() {
		let{miliseconds, seconds, minutes} = this.state;
		miliseconds = miliseconds + 1;
		if (miliseconds >= 100) {
			seconds += 1;
			miliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
		}
		this.setState({
			minutes,
			seconds,
			miliseconds
		})
	};

	step() {
		if (!this.running) return;
		this.calculate();
	};

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	};

	stop() {
		this.running= false;
		clearInterval(this.watch);
	};

	reset() {
		this.running = false;
		this.setState({
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		});
		clearInterval(this.watch)
	};

	render(){
		let { miliseconds, seconds, minutes } = this.state;
		return (
			<div>
				<div className="controls">
					<a href="#" onClick={() => this.start()}>Start</a>
					<a href="#" onClick={() => this.stop()}>Stop</a>
				</div>
				<div className="stopwatch">
					{this.format({
						minutes: minutes,
						seconds: seconds,
						miliseconds: miliseconds
					})}
				</div>
			</div>
		);
	};
};

let timer = React.createElement(Stopwatch)
ReactDOM.render(timer, document.getElementById('timer'))