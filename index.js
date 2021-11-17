const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const Tello = require("tello-drone");
const drone = new Tello();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

drone.on("connection", () => {
    console.log("Connected to drone");
    drone.send("battery?");
});
 
drone.on("send", (err, length) => {
    if (err) console.log(err);
 
    console.log(`Sent command is ${length} long`);
});
 


drone.on("message", message => {
    console.log("Recieved Message > ", message);
});

    drone.on("connection",() => {

      var br = drone.send("battery?")

      console.log(br)
        io.on('connection', (socket) => {
    
            socket.on('right', msg => {
                 right();
              console.log("right")
              io.emit('log', "right");
            });
          
            socket.on('left', msg => {
                left();
              console.log("left")
              io.emit('log', "left");
            });
          
            socket.on('back', msg => {
             back();
              console.log("back")
              io.emit('log', "back");
            });
          
            socket.on('front', msg => {
                front();
              console.log("front")
              io.emit('log', "front");
            });
          
            socket.on('land', msg => {
                land();
              console.log("land")
              io.emit('log', "land");
            });
          
            socket.on('takeoff', msg => {
                takeoff();
             console.log("takeoff")
             io.emit('log', "takeoff");
            });
          
            socket.on('stop', msg => {
                stop();
             console.log("stop")
             io.emit('log', "stop");
            });

            socket.on('down', msg => {
                down();
             console.log("down")
             io.emit('log', "down");
            });
          
            socket.on('up', msg => {
                up();
             console.log("up")
             io.emit('log', "up");
            });

            socket.on('cwr', msg => {
              cwr();
           console.log("rotation droite")
           io.emit('log', "rotation droite");
          });

          socket.on('cwl', msg => {
            cwl();
         console.log("rotation gauche")
         io.emit('log', "rotation gauche");
        });
          });


        function right(){
            try {
                console.log("try")
                 drone.send("right", { value: "75" });
            } catch (error) {
                console.log(error)
                drone.send("land")
                setTimeout(process.exit)
            }
        }

        function left(){
          try {
              console.log("try")
             drone.send("left", { value: "75" });
          } catch (error) {
              console.log(error)
              drone.send("land")
              setTimeout(process.exit)
          }
      }

      function cwr(){
        try {
            console.log("try")
           drone.send("cw", { value: "30" });
        } catch (error) {
            console.log(error)
            drone.send("land")
            setTimeout(process.exit)
        }
    }

    function cwl(){
      try {
          console.log("try")
         drone.send("ccw", { value: "30" });
      } catch (error) {
          console.log(error)
          drone.send("land")
          setTimeout(process.exit)
      }
  }

      function stop(){
        try {
            console.log("try")
             drone.send("stop");
        } catch (error) {
            console.log(error)
            drone.send("land")
            setTimeout(process.exit)
        }
    }

    function back(){
      try {
          console.log("try")
          drone.send("back", { value: "75" });
      } catch (error) {
          console.log(error)
          drone.send("land")
          setTimeout(process.exit)
      }
  }

  function front(){
    try {
        console.log("try")
        drone.send("forward", { value: "75" });
    } catch (error) {
        console.log(error)
        drone.send("land")
        setTimeout(process.exit)
    }
    }

function land(){
  try {
      console.log("try")
      drone.send("land");
  } catch (error) {
      console.log(error)
      drone.send("land")
      setTimeout(process.exit)
  }
}

function takeoff(){
  try {
      console.log("try")
      drone.send("takeoff");
  } catch (error) {
      console.log(error)
      drone.send("land")
      setTimeout(process.exit)
  }
}

function down(){
    try {
        console.log("try")
        drone.send("down", { value: "75" });
    } catch (error) {
        console.log(error)
        drone.send("land")
        setTimeout(process.exit)
    }

    }
    function up(){
        try {
            console.log("try")
            drone.send("up", { value: "75" });
        } catch (error) {
            console.log(error)
            drone.send("land")
            setTimeout(process.exit)
        }
        }


});





http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


//---------------------------------------------------Drone----------------------------------------------------------------\\