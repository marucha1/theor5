if(typeof(Firefogg) == 'undefined') {
  alert('You dont have Firefogg, please go to http://firefogg.org to install it');
  window.open('http://firefogg.org');
}

var ogg = new Firefogg();

if(ogg.selectVideo()) {
  var options = JSON.stringify({'width': 1});
  ogg.encode(options,
             function(result, file) {
                result = JSON.parse(result);
                update_progress(result.progress, result.state);


                var xhr = new XMLHttpRequest();
                xhr.addEventListener('progress', function(e) {
                    var progress = e.position || e.loaded, total = e.totalSize || e.total;
                    update_progress(progress, 'uploading');
                }, false);
                xhr.open('post', uploadUrl, true);
                xhr.send(file)
             },
             function(progress) {
                progress = JSON.parse(progress);
                update_progress(progress.progress, progress.state);
             }
  );
}


function update_progress(progress, text) {
    var progressbar = document.getElementById('progressbar');
    var relleno = parseInt(progress*10000);
    progressbar.setAttribute("value",relleno);
    if (relleno == 10000) {
      alert("Saludos!");
    }
}
