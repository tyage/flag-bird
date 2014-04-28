chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('panel.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });
});
