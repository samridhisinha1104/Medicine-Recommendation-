document.addEventListener('DOMContentLoaded', function () {

  // Mic button — speech recognition
  var micBtn = document.getElementById('micBtn');
  var input = document.getElementById('symptoms');
  var transcription = document.getElementById('transcription');

  if (micBtn && input) {
    micBtn.addEventListener('click', function () {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        if (transcription) transcription.textContent = 'Speech recognition is not supported in this browser.';
        return;
      }

      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      var recognition = new SR();
      recognition.lang = 'en-US';

      micBtn.classList.add('listening');

      recognition.onresult = function (e) {
        var text = e.results[0][0].transcript;
        input.value = text;
        if (transcription) transcription.textContent = text;
      };

      recognition.onerror = function (e) {
        micBtn.classList.remove('listening');
        if (transcription) transcription.textContent = 'Error: ' + e.error;
      };

      recognition.onend = function () {
        micBtn.classList.remove('listening');
      };

      recognition.start();
    });
  }

  // Scroll to results if they exist
  var results = document.getElementById('results');
  if (results) {
    setTimeout(function () {
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

});