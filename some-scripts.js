function ThrowError() {

	this.throwing = function() {
		this.error();
	}

	this.error = function() {
		this.object();
	}

	this.object = function() {
		throw new Error("MyError");
	}
	this.methodWithError = function() {
		this.throwing();
	};
}
var throwError = new ThrowError();

function LogStackStrace() {
	this.logging = function() {
		this.stack();
	}

	this.stack = function() {
		this.trace();
	}

	this.trace = function() {
		logger.error(printStackTrace("MyError").join('\n'));
	}
	this.methodWithError = function() {
		this.logging();
	};
}
var logStackTrace = new LogStackStrace();

function LogStackStraceOfError() {

	this.logging = function() {
		this.error();
	}

	this.error = function() {
		this.stacktrace();
	}

	this.stacktrace = function() {
		throw new Error("MyError");
	}
	this.methodWithError = function() {
		try {
			this.logging();
		} catch (error) {
			logger.error(printStackTrace({
				e: error
			}).join('\n'));
		}
	};
}
var logStackTraceOfError = new LogStackStraceOfError();