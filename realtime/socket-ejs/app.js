var express = require('express');
var app = express();
var path = require('path');
var port = 8081;
 
var server = app.listen(port, function() {
    console.log('Listening on port: ' + port);
}); 
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
 
app.get('/', function(req, res) {
    res.render('index');
});



var io = require('socket.io').listen(server);
 
// เมื่อมี client เข้ามาเชื่อมต่อให้ทำอะไร?


io.on('connection', function(socket) {
    // แสดงข้อความ "a user connected" ออกมาทาง console
    console.log('a user connected');
   // myFunc();
    

});


//myFunc();
 //setTimeout(myFunc, 3000);



// ------------------------A1
io.on('connection', function(socket) {
    // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
    socket.on('chat1', function(messages) {
        // แสดงข้อมูลที่ได้ ออกมาทาง console
        console.log(messages);
    });
});

io.on('connection', function(socket) {
    socket.on('chat1', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('chat1', messages);
    });
});



// ------------------------A2
// io.on('connection', function(socket) {
//     // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
//     socket.on('chat2', function(messages) {
//         // แสดงข้อมูลที่ได้ ออกมาทาง console
//         console.log(messages);
//     });
// });
io.on('connection', function(socket) {
    socket.on('chat2', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('chat2', messages);
    });
});

// ------------------------A3
// io.on('connection', function(socket) {
//     // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
//     socket.on('chat3', function(messages) {
//         // แสดงข้อมูลที่ได้ ออกมาทาง console
//         console.log(messages);
//     });
// });
io.on('connection', function(socket) {
    socket.on('chat3', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('chat3', messages);
    });
});

// ------------------------A4
// io.on('connection', function(socket) {
//     // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
//     socket.on('chat4', function(messages) {
//         // แสดงข้อมูลที่ได้ ออกมาทาง console
//         console.log(messages);
//     });
// });
io.on('connection', function(socket) {
    socket.on('chat4', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('chat4', messages);
    });
});

// ------------------------A5
// io.on('connection', function(socket) {
//     // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
//     socket.on('chat5', function(messages) {
//         // แสดงข้อมูลที่ได้ ออกมาทาง console
//         console.log(messages);
//     });
// });
io.on('connection', function(socket) {
    socket.on('chat5', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('chat5', messages);
    });
});

// ------------------------A6
// io.on('connection', function(socket) {
//     // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
//     socket.on('chat6', function(messages) {
//         // แสดงข้อมูลที่ได้ ออกมาทาง console
//         console.log(messages);
//     });
// });
io.on('connection', function(socket) {
    socket.on('chat6', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('chat6', messages);
    });
});


io.on('connection', function(socket) {
    socket.on('reportCheckList', function(messages) {
        // ส่งข้อความที่ได้ไปหาทุกๆ client ที่เชื่อมต่อกับท่อชื่อ "chat"
        io.emit('reportCheckList', messages);
    });
});
