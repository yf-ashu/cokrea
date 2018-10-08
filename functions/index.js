// Firebase
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.database();
// const nodemailer = require('nodemailer');

// Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use('/app/', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝get Account 得到帳號
app.post('/app/getAccount', (req, res) => {
  let userId = req.body.id;
  console.log(userId);
  if (userId === null) {
    return res.json({
      error: 'No Data'
    });
  } else {
    db.ref('/userData/' + userId).once('value', snapshot => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        console.log(data);
        delete data.createTime;
        delete data.updateTime;
        return res.json(data);
      } else {
        return res.json({
          error: 'No User'
        });
      }
    });
  }
});
app.post('/app/getProject', (req, res) => {
  let data = req.body;
  if (!data.userId || !data.projectId) {
    res.send({
      error: 'Create Order Error: Wrong Data Format'
    });
    return;
  }
  db.ref('/projectData/' + data.projectId).once('value', snapshot => {
    if (snapshot.exists()) {
      let getData = snapshot.val();
      console.log(getData);
      delete getData.createTime;
      delete getData.updateTime;
      return res.json(getData);
    } else {
      return res.json({
        error: 'No Project'
      });
    }
  });
});

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝New & Update Account
app.post('/app/manageAccount', (req, res) => {
  let data = req.body;
  let now = new Date();
  if (!data.userEmail || !data.userId) {
    res.send({
      error: 'Create Order Error: Wrong Data Format'
    });
    return;
  }
  let userId = data.userId;

  let memberData = {
    userId: data.userId,
    userEmail: data.userEmail,
    providerId: data.providerId,
    createTime: now.getTime(),
    updateTime: now.getTime()
  };
  db.ref('/userData/' + userId).once('value', snapshot => {
    if (snapshot.exists()) {
      let getData = snapshot.val();
      Object.keys(data).map(getdata => {
        console.log(getdata);
      });
      if (data.userTel != null) {
        getData.userTel = data.userTel;
      }
      if (data.userAddress != null) {
        getData.userAddress = data.userAddress;
      }
      if (data.userName != null) {
        getData.userName = data.userName;
      }

      getData.updateTime = now.getTime();
      db.ref('/userData/' + userId).update(getData, error => {
        res.send({
          number: userId
        });
      });
    } else {
      db.ref('/userData/' + userId).set(memberData, error => {
        if (error) {
          res.send({
            error: 'Create Account Error'
          });
        } else {
          res.send({
            success: 'Create Account'
          });
        }
      });
    }
  });
});
// =======add project
app.post('/app/addNewProject', (req, res) => {
  let data = req.body;
  let now = new Date();
  if (!data.userId || !data.project) {
    res.send({
      error: 'Create Order Error: Wrong Data Format'
    });
    return;
  }
  let userId = data.userId;
  console.log(data);
  db.ref('/userData/' + userId).once('value', snapshot => {
    if (snapshot.exists()) {
      let getData = snapshot.val();

      getData.project = data.project;
      getData.userId = data.userId;
      getData.updateTime = now.getTime();
      if (data.share) {
        getData.share = data.share;
      }
      db.ref('/userData/' + userId).update(getData, error => {});
    }
  });
  //新增一個專案
  let projectData = {
    projectId: data.newItem,
    projectName: data.projectName,
    createTime: now.getTime(),
    updateTime: now.getTime(),
    owner:userId
  };
  let usernew = data.newItem;
  console.log(usernew);
  db.ref('/projectData/' + usernew).set(projectData, error => {
    if (error) {
      res.send({
        error: 'Create project Error'
      });
    } else {
      res.send({
        success: 'Create project'
      });
    }
  });
});
//savaProject
app.post('/app/manageProject', (req, res) => {
  let data = req.body;
  let now = new Date();
  if (!data.userId || !data.projectId) {
    res.send({
      error: 'Create Order Error: Wrong Data Format'
    });
    return;
  }

  db.ref('/projectData/' + data.projectId).once('value', snapshot => {
    if (snapshot.exists()) {
      let getData = snapshot.val();
      if (data.share) {
        getData.share = data.share;
      }
      getData.updateTime = now.getTime();
      if (data.display) {
        getData.display = data.display;
      }
      if (data.editMainStyle) {
        getData.editMainStyle = data.editMainStyle;
      }

      db.ref('/projectData/' + data.projectId).update(getData, error => {
        if (error) {
          res.send({
            error: 'Create project Error'
          });
        } else {
          res.send({
            success: 'Create project'
          });
        }
      });
    }
  });
});

let maskValue = function(value) {
  let newValue = '';
  for (let i = 0; i < value.length; i++) {
    if (i % 2 === 0) {
      newValue += '*';
    } else {
      newValue += value.charAt(i);
    }
  }
  return newValue;
};

exports.app = functions.https.onRequest(app);
