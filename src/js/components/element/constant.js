import h1 from '../../../img/edit.svg';
import firebase from 'firebase/app';
require('firebase/auth');
export const constant = {
    buttonDisplay: {
        text: [
            {
                type: 'h1',
                src: h1,
                size: { width: 0.8, height: 75 },
                textContent: 'Lorem ipsum dolor sit .',
                format: 'text'
            },
            {
                type: 'h2',
                src: h1,
                size: { width: 0.8, height: 55 },
                textContent: 'Lorem ipsum dolor, sit amet .',
                format: 'text'
            },
            {
                type: 'p',
                src: h1,
                size: { width: 0.8, height: 65 },
                format: 'text',
                textContent:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, sunt laboriosam ea omnis obcaecati !'
            },
            {
                type: 'span',
                src: h1,
                size: { width: 0.8, height: 65 },
                format: 'text',
                textContent:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, sunt laboriosam ea omnis obcaecati incidunt quaerat ipsam a delectus dolore dolorum !'
            }
        ],
        img: [
            {
                type: 'img',
                src: h1,
                size: { width: 0.8, height: 0.8 },
                format: 'image'
            }
        ],
        square: []
    }
};

export const random = () => {
    let date = Date.now().toString();
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    let random = '';
    for (let i = 1; i < 15; i += 3) {
        let str = possible.charAt(Math.floor(Math.random() * possible.length));

        if (i === 1) {
            random =
                str +
                date.slice(0, i + 1) +
                str +
                date.slice(i + 2, date.length);
        } else {
            random =
                random.slice(0, i + 1) +
                str +
                random.slice(i + 2, random.length);
        }
    }
    return random;
};

export const connectFetch = (target, payload, fn) => {
    // console.log(payload)
    let url = `https://cokrea-editor.firebaseapp.com${target}`;
    // console.log(url)
    fetch(url, payload)
        .then(function(response) {
            return response.json();
        })
        .then(jsonData => {
            console.log(jsonData);
            return fn(jsonData);
        })
        .catch(err => {
            console.log('錯誤:', err);
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
export const styleSetting = type => {
    let tmp = [];
    switch (type.type) {
    case 'img': {
        tmp = [{ backgroundColor: '#ffffff' }];
        break;
    }
    case 'h1': {
        tmp = [
            { backgroundColor: 'rgba(0,0,0,0)' },
            { color: '#000000' },
            { fontWeight: 700 },
            { fontStyle: 'normal' },
            { fontSize: 47 }
        ];
        break;
    }
    case 'h2': {
        tmp = [
            { backgroundColor: 'rgba(0,0,0,0)' },
            { color: '#000000' },

            { fontWeight: 700 },
            { fontStyle: 'normal' },
            { fontSize: 22 }
        ];
        break;
    }
    default: {
        tmp = [
            { backgroundColor: 'rgba(0,0,0,0)' },
            { color: '#000000' },

            { fontWeight: 400 },
            { fontStyle: 'normal' },
            { fontSize: 16 }
        ];
    }
    }
    return tmp;
};