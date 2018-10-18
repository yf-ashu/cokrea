import { connectFetch } from './constant';

import firebase from 'firebase/app';
require('firebase/auth');

export const authInfomation = func => {
    let storage = firebase.storage();
    let database=firebase.database();

    firebase.auth().onAuthStateChanged(user => {
        let authInfomation=[];
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
            
                if(data.project){
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
                                        database,
                                        imgUrl
                                    ];
                                    console.log(authInfomation);
                                    return func(authInfomation);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });

                    })
                }else{

                
                    
                    console.log('沒有圖片')
                    authInfomation = [
                        user,
                        data,
                        database,
                        null
                    ]
                    return func(authInfomation);
                }
                    

            };
            console.log('在這裡');
            connectFetch(target, payload, getMemberData);
        } else {
            // this.props.loading();
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
