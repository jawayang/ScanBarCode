// Define "MyApp" as a revealing module
Barcode = (function($) {

    var run = function() {
        console.log("test");
    };
    var time = null;
    var str = "";
    var timeStamp = null;
    var minTime = 1000;

    return {
        init: function() {
            $(document).keypress(function(e) {
                var keyCode = e.keyCode ? e.keyCode : e.which;
                var w = String.fromCharCode(keyCode);
                str = str.concat(w);
                if (time == null) {
                    time = e.timeStamp;
                } else {
                    timeStamp = e.timeStamp - time;
                    time = e.timeStamp;
                }

                if (timeStamp > minTime) {
                    //無效的輸入
                    str = "";
                } else {
                    var patt = /^!!\S+!!!/g;
                    var test = patt.test(str);
                    if (test) {
                        $("#barcode").text(str);
                    }
                }
                e.preventDefault();
            });
        }
    };

})(jQuery);



// Run "MyApp" in DOMReady

$(function() {
    Barcode.init();
});