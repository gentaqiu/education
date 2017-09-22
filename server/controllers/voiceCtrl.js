var sha1 = require('sha1');
var fs = require('fs');
var config = require('config');
var https = require('https');
Stream = require('stream').Transform
//https://translate.google.com/translate_tts?ie=UTF-8&q=%E4%BD%A0%E5%A5%BD&tl=zh-CN&total=1&idx=0&textlen=2&tk=14682.416633&client=t&hint=en
module.exports.path = function(req, res) {
    body = req.body;
    var text = body.text;  
    console.log(text);

    var hash = sha1(text);

    var webRoot = config.get("webRoot");
    console.log("webRoot="+webRoot);
    var relativePath = "/assets/audio/"+hash+".mp3";
    var path = webRoot + relativePath;

    
    if (fs.existsSync(path)) {
        // Do something
        console.log("yes file existed");
    }
    else {
        console.log("no file existed");
        //var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=%E4%BD%A0%E5%A5%BD&tl=zh-CN&total=1&idx=0&textlen=2&tk=14682.416633&client=t&hint=en";
        var url = "https://translate.google.com/translate_tts?ie=UTF-8&q="+encodeURIComponent(text)+"&tl=zh-CN&total=1&idx=0&textlen=2&tk=14682.416633&client=t&hint=en";
        console.log(url);
        https.get(url, (res) => {
          var data = new Stream(); 
          //console.log('statusCode:', res.statusCode);
          //console.log('headers:', res.headers);

          res.on('data', (d) => {
            //process.stdout.write(d);
            data.push(d);
          });
          res.on('end', function() {          
            console.log('start writing');                                   
            fs.writeFileSync(path, data.read());                               
          });
        }).on('error', (e) => {
          //console.error(e);
        });       
    }
    var retJson = { path: relativePath};
    return res.status(200).json(retJson);
};