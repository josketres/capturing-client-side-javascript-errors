(function(w) {
	var errorCount = 0,
		endpointUrl = 'http://localhost:1337/error-report',
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
		var xhr = createXMLHTTPObject();
		xhr.open('POST', endpointUrl, true);
		xhr.send(error);
	};


	createXMLHTTPObject = function() {
		var xmlhttp, XMLHttpFactories = [
				function() {
					return new XMLHttpRequest();
				},
				function() {
					return new ActiveXObject('Msxml2.XMLHTTP');
				},
				function() {
					return new ActiveXObject('Msxml3.XMLHTTP');
				},
				function() {
					return new ActiveXObject('Microsoft.XMLHTTP');
				}
			];
		for (var i = 0; i < XMLHttpFactories.length; i++) {
			try {
				xmlhttp = XMLHttpFactories[i]();
				// Use memoization to cache the factory
				createXMLHTTPObject = XMLHttpFactories[i];
				return xmlhttp;
			} catch (e) {}
		}
	};

	// Export logger object and set global error handler
	w.onerror = globalErrorHandler;
	w.logger = {
		error: logError
	};
})(window);