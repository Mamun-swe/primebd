
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const Messages = require('./models/Messages')

// DB Connection here
mongoose.connect('mongodb+srv://mamun166009:1118964208@cluster0-lkz2b.mongodb.net/chat?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
});
const db = mongoose.connection
db.on('error', (err) => {
  console.log(err)
})
db.once('open', () => {
  console.log('MongoDB connection success')
})


const app = express();
app.use(morgan('dev'));
app.use(cors());


const server = http.createServer(app);
const io = socketio(server);


const Route = require("./api/routes/route");
app.use(Route);


// Socket io connection
io.on('connection', (socket) => {

  // Join
  socket.on('join', (sender, callback) => {
    socket.join(sender)
    socket.emit('message', { message: "You are joined" })
  })

  // Send Message
  socket.on('message', async ({ sender, reciver, message }, callback) => {
    try {
      const data = {
        sender,
        reciver,
        message
      }
      socket.broadcast.to(reciver).emit("message", data)
      const newMessage = new Messages({
        sender: parseInt(sender),
        reciver: parseInt(reciver),
        message: message
      })
      const saveMsg = await newMessage.save()
      if (saveMsg) {
        callback({ status: true })
      }

    } catch (error) {
      if (error) return callback({ error })
    }

  });

  // Get Messages
  socket.on("getmessage", async ({ sender, reciver }, callback) => {
    try {
      let final = []

      // Result for A user
      let result1 = await Messages.find({
        $and: [{ sender: sender }, { reciver: reciver }]
      },
        { _id: 0 });

      // Result for B user
      let result2 = await Messages.find({
        $and: [{ sender: reciver }, { reciver: sender }]
      },
        { _id: 0 });

      for (let index = 0; index < result1.length; index++) {
        const element = result1[index];
        final.push(element)
      }

      for (let index = 0; index < result2.length; index++) {
        const element = result2[index];
        final.push(element)
      }

      // Sort by date
      final.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      callback(final);

    } catch (e) {
      console.error(e);
    }
  });

  socket.on('disconnect', () => {
    console.log('User had left');
  })
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
