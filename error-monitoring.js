(function(w) {
	var errorCount = 0,
		endpointUrl = 'logging-endpoint',
		logError,
		globalErrorHandler,
		sendHttpRequest,
		createXHR;

	logError = function(error) {
		if (errorCount < 5) {
			sendHttpRequest(error);
			errorCount++;
		}
	};

	globalErrorHandler = function(error, location, line) {
		if (errorCount < 5) {
			sendHttpRequest(error + ' [' + location + ':' + line + ']');
			errorCount++;
		}
	};

	sendHttpRequest = function(error) {
		var xhr = createXHR();
		xhr.open('POST', endpointUrl, true);
		xhr.send(error);
	};

	createXHR = function() {
		var xhr;
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xhr = null;
			}
		} else {
			xhr = new XMLHttpRequest();
		}
		return xhr;
	};

	// Export logger object and set global error handler
	w.onerror = globalErrorHandler;
	w.logger = {
		error: logError
	};
})(window);