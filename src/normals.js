const NormalsApp = {
    // PROPERTIES //

	// Global app properties
	canvas: undefined,
	context: undefined,
	width: undefined,
	height: undefined,
	FPS: 60,
	framesCounter: 0,
	secondsCounter: 0,

    // Dom properties
    elementVectorX: undefined,
    elementVectorY: undefined,
    calcButton: undefined,

    // Logic properties
    vectorX: { x: undefined, y: 0 },
    vectorY: { x: 0, y: undefined },
    vectorResult: { x: undefined, y: undefined },
    vectorNormal: { x: undefined, y: undefined },

	// Drawing properties
	background: undefined,

	keys: {
		KeyW: 'w',
	},

	keyWDown: false,

	pressed: false,

	// INITIALITATION //

	init() {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

        this.elementVectorX = document.getElementById('vector-x');
        this.elementVectorY = document.getElementById('vector-y');
        this.calcButton = document.getElementById('calc-button');

		this.setDimensions();

		this.start();
	},

	setDimensions() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height-5);
	},

	setEventListeners() {
		document.onkeydown = (e) => {
			e.key.toLowerCase() === this.keys.KeyW && (this.keyWDown = true);			

			// if (e.key.toLowerCase() === this.keys.KeyW && !this.pressed) {
			// 	this.keyWDown = true;
			// 	this.pressed = true;
			// }

		};

		document.onkeyup = (e) => {
			e.key.toLowerCase() === this.keys.KeyW && (this.keyWDown = false);
			
			// if (e.key.toLowerCase() === this.keys.KeyW) {
			// 	this.keyWDown = false;
			// 	this.pressed = false;
			// }
			
		};

        this.calcButton.onclick = (e) => {
			e.preventDefault();

			this.createAll();

            document.querySelector('.vector').reset()
		};
	},

    start() {
		this.setEventListeners();

		this.interval = setInterval(() => {
			if (this.framesCounter % 60 === 0) {
				this.framesCounter = 0;
				this.secondsCounter++;
			}

			this.clear();

			this.drawAll();

			this.framesCounter++;
		}, 1000 / this.FPS);
	},

    clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	drawAll() {
		this.drawBackground();

        this.drawXVector();
        this.drawYVector();
        this.drawResultVector();

        this.drawNormalVector(20);
	},

	drawBackground() {
        this.context.fillStyle = '#ffbf5730';
        this.context.fillRect(0, 0, this.width, this.height);
	},

    drawXVector() {
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 4;

        this.context.beginPath();
        this.context.moveTo(this.width/2, this.height/2);
        this.context.lineTo(this.width/2 + this.vectorResult.x, this.height/2);
        this.context.stroke();
        this.context.closePath();
    },

    drawYVector() {
        this.context.strokeStyle = 'green';
        this.context.lineWidth = 4;

        this.context.beginPath();
        this.context.moveTo(this.width/2, this.height/2);
        this.context.lineTo(this.width/2, this.height/2 - this.vectorResult.y);
        this.context.stroke();
        this.context.closePath();
    },

    drawResultVector() {
        this.context.strokeStyle = 'lightblue';
        this.context.lineWidth = 3;

        this.context.beginPath();
        this.context.moveTo(this.width/2, this.height/2);
        this.context.lineTo(this.width/2 + this.vectorResult.x, this.height/2 - this.vectorResult.y);
        this.context.stroke();
        this.context.closePath();
    },

    drawNormalVector(vel) {
        this.context.strokeStyle = 'orange';
        this.context.lineWidth = 4;

        this.context.beginPath();
        this.context.moveTo(this.width/2, this.height/2);
        this.context.lineTo(this.width/2 + this.vectorNormal.x * vel, this.height/2 - this.vectorNormal.y * vel);
        this.context.moveTo(this.width/2, this.height/2);
        this.context.lineTo(this.width/2 + this.vectorNormal.x * vel, this.height/2);
        this.context.moveTo(this.width/2, this.height/2);
        this.context.lineTo(this.width/2, this.height/2 - this.vectorNormal.y * vel);
        this.context.stroke();
        this.context.closePath();
    },

    createAll() {
        this.createXVector();
        this.createYVector();
        this.createResultVector();
        this.createNormalVector();
        console.log(this.vectorNormal);
    },

    createXVector() {
        this.vectorX = Number(this.elementVectorX.value);
    },

    createYVector() {
        this.vectorY = Number(this.elementVectorY.value);
    },

    createResultVector() {
        this.vectorResult = { x: this.vectorX, y: this.vectorY };
        console.log(this.vectorResult);
    },

    createNormalVector() {
        this.vectorNormal = this.normalizeVector(this.vectorResult);
    },

    normalizeVector(vector) {
        const normal = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

        return {
            x: vector.x / normal,
            y: vector.y / normal
        };        
    }
}