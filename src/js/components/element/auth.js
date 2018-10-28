import { connectFetch } from './constant';
import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
export const authInfomation = func => {
    let storage, database;
    if (!firebase.apps.length) {
        let connect = initFirebase();
        database = connect.database();
        storage = connect.storage();
    }
    database = firebase.database();
    storage = firebase.storage();

    firebase.auth().onAuthStateChanged(user => {
        let authInfomation = [];
        if (user) {
            console.log('有登入');
            let data = {
                id: user.uid
            };
            console.log(user);
            let target = '/app/getAccount';
            let payload = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            };
            let getMemberData = data => {
                let imgUrl = {};
                if (data.project) {
                    data.project.map(projectdata => {
                        console.log(projectdata.projectId);
                        storage
                            .ref(projectdata.projectId + '/canvas.png')
                            .getDownloadURL()
                            .then(url => {
                                imgUrl[projectdata.projectId] = url;
                                if (
                                    Object.keys(imgUrl).length ===
                                    data.project.length
                                ) {
                                    authInfomation = [
                                        user,
                                        data,
                                        [database, storage],
                                        imgUrl
                                    ];
                                    console.log(authInfomation);
                                    return func(authInfomation);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
                } else {
                    console.log('沒有圖片');
                    authInfomation = [user, data, [database, storage], null];
                    return func(authInfomation);
                }
            };
            console.log('在這裡');
            connectFetch(target, payload, getMemberData);
        } else {
            authInfomation = null;
            console.log('沒有登入');
            return func(authInfomation);
        }
    });
};
export const initFirebase = () => {
    let config = {
        apiKey: 'AIzaSyAncjAic0clz2IUCF-HOjHVOCe9_YCRzdo',
        authDomain: 'cokrea-editor.firebaseapp.com',
        databaseURL: 'https://cokrea-editor.firebaseio.com',
        projectId: 'cokrea-editor',
        storageBucket: 'cokrea-editor.appspot.com',
        messagingSenderId: '751312443170'
    };
    let firebaseConnect = firebase.initializeApp(config);
    var database = firebase.database();
    console.log(database);
    return firebaseConnect;
};
export const getAddress = () => {
    let projectDatahref = location.href.split('edit/')[1];
    return projectDatahref;
};

export const firebaseSet = (prePath,nextPath,value) => {
    let address=getAddress();

    firebase
        .database()
        .ref(prePath+'/' + address + '/'+nextPath)
        .set(value);
};

export const firebaseOnsite=(that,user)=>{
    let database=firebase.database();
    let address=getAddress();

    const connectedRef = database.ref('.info/connected');
    connectedRef.off();
    connectedRef.on('value', function(snap) {
        if (snap.val() === true) {
            let dataconnect = database.ref(
                'temp/' + address+ '/nowclick/' + user.uid
            );
            dataconnect.set([that.state.controllCurrent, user.displayName]);
            dataconnect.onDisconnect().remove();
            database
                .ref('temp/' + address + '/nowclick')
                .on('value', snapshot => {
                    that.setState({
                        othercontrollCurrent: snapshot.val()
                            ? snapshot.val()
                            : []
                    });
                });

            let trash = database.ref('temp/' + address + '/trash');
            trash.onDisconnect().remove();
            database
                .ref('temp/' + address + '/trash')
                .on('value', snapshot => {
                    if (snapshot.val()) {
                        let combine;
                        if (that.state.trashCan !== null) {
                            combine = Object.assign(
                                snapshot.val(),
                                that.state.trashCan
                            );
                        }
                        that.setState({
                            trashCan: combine
                        });
                    }
                });

            that.setState({
                loading: false
            });
        } else {
            console.log('離線');
            firebaseSet('temp', 'nowclick/' + user.uid, 'null');
            firebaseSet('temp', 'trash', that.state.trashCan);
        }
    });
};
export const firebaseGetProjectData=(that)=>{
    let database=firebase.database();
    let address=getAddress();
    database.ref('/projectData/' + address).off();
    database
        .ref('/projectData/' + address)
        .once('value', snapshot => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                if (snapshot.val().owner === that.state.loginStatus.uid) {
                    let shareButton = that.state.shareButton;
                    shareButton[1] = true;
                    that.setState(
                        {
                            shareButton: shareButton
                        },
                        () => {
                            that.connectDb(
                                database,
                                that.state.loginStatus
                            );
                        }
                    );
                } else if (data.share[1] !== 'no data') {
                    let okMail= data.share[1].filter(userdata => {
                        return  userdata === that.state.loginStatus.email;
                        
                    });
                    if (okMail.length===0) {
                        alert('沒有存取權');
                        window.location.pathname = '/';
                    }else{
                        that.connectDb(
                            database,
                            that.state.loginStatus
                        );
                    }
                } else {
                    if (data.share[0].public === 'public') {
                        window.location.pathname =
                            '/views/' + address;
                    } else {
                        alert('沒有存取權');
                        window.location.pathname = '/';
                    }
                }
            } else {
                alert('沒有此檔案');
                window.location.pathname = '/';
            }
        });


};