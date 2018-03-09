var page = require('webpage').create();
var homeAddress = 'https://yoursite.com';
var username = 'yourusername';
var password = 'yourpassword';

page.viewportSize = { width: 1920, height: 1080 };

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    })
}

page.onResourceRequested = function (req) {
	//console.log('requested: ' + JSON.stringify(req, undefined, 4));
	console.log('requested: ' + req.url);
};
page.onResourceReceived = function (res) {
	console.log('received: ' + req.url);
	//console.log('received: ' + JSON.stringify(res, undefined, 4));
};



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
setTimeout(function() {
    console.log("");
    console.log("### STEP 1: Load '" + homeAddress + "'");
    page.open(step1urlfunction (status) {
		if (status !== 'success') {
			console.log('FAIL to load the address: ' + homeAddress);
		} else {
			console.log('status OK');
			page.render('yourScreenshotOfLoginPage.png');
		}
	});
}, 50);

setTimeout(function() {
    console.log("");
    console.log("### STEP 2: Login");
	page.evaluate(function() {
		console.log('loggin in...');
		var arr = document.getElementsByTagName("form");
		for (var i=0; i < arr.length; i++) {
			if (arr[i].getAttribute('method') == "post") {
			// in this example the java web application expect the following variables names
				arr[i].elements['j_username'].value = 'yourusername';
				arr[i].elements['j_password'].value = 'yourpassword';
				arr[i].submit();
				return;
			}
		}
	});
	page.render('credentialsScreenshot.png');
}, 1000);

setTimeout(function() {
    console.log("");
    console.log("### STEP 3: Home Screen");
	page.render('homeScreenshot.png');
}, 60000);
 

 setTimeout(function() {
    console.log("");
    console.log("### STEP 5: Close page and shutdown (with a delay)");
    page.close();
    setTimeout(function(){
        phantom.exit();
    }, 100);
}, 61000);