import phone from '../../../img/phone.svg';
import mail from '../../../img/mail.svg';
import h1 from '../../../img/text-01.png';
import h2 from '../../../img/text-02.png';
import p from '../../../img/text-04.png';
import span from '../../../img/text-03.png';

export const constant = {
    buttonDisplay: {
        text: [
            {
                type: 'h1',
                src: h1,
                size: { width: 0.8, height: 75 },
                textContent: 'Double click to edit',
                format: ['text', 'text']
            },
            {
                type: 'h2',
                src: h2,
                size: { width: 0.8, height: 55 },
                textContent: 'Double click to edit',
                format: ['text', 'text']
            },
            {
                type: 'p',
                src: p,
                size: { width: 0.8, height: 65 },
                format: ['text', 'text'],
                textContent:
                    'Double click to edit'
            },
            {
                type: 'span',
                src: span,
                size: { width: 0.8, height: 65 },
                format: ['text', 'text'],
                textContent:
                    'Double click to edit. This is a span text area.'
            }
        ],
        img: [
            {
                type: 'img',
                src: phone,
                size: { width: 0.3, height: 55 },
                format: ['image', 'phone']
            },
            {
                type: 'img',
                src: mail,
                size: { width: 0.3, height: 55 },
                format: ['image', 'mail']
            }
        ],
        square: []
    },
    color : ['red', 'yellow', 'orange', 'blue', 'purple', 'green'],
    editor:{
        display: [], //控制中間元素出現
        type: { type: null, name: null }, //控制左邊按鈕是否顯示
        buttonItem: [], //控制左邊預設按鈕出現
        editMainStyle: [
            {
                scale: 1,
                style: [
                    { width: 800 },
                    { height: 2000 },
                    { transform: 'scale(1)' },
                    { transformOrigin: '0 0' },
                    { backgroundColor: '#ffffff' }
                ]
            }
        ], //主畫布的style
        controllCurrent: ['page', null, null, null], //第一個是種類，第二個是主要的，第三個是移圖層用的
        fileUpload: { imgUrl: null, file: null },
        mouseEvent: 'true',
        saveButton: false,
        shareButton: [false, false],
        history: [],
        redoItem: [],
        loginStatus: null,
        projectData: null,
        database: null,
        othercontrollCurrent: [],
        loading: true,
        downloadUrl: null,
        intervalId: null,
        saved: [false, '已存檔'],
        trashCan: {},
        locationHref: null
    }

};

export const random = () => {
    let date = Date.now().toString();
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
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
            return fn(err);
        });
};

export const styleSetting = type => {
    let tmp = [];
    switch (type.type) {
    case 'img': {
        tmp = [{ backgroundColor: 'rgba(0,0,0,0)' },
            { color: '#000000' },
            {borderRadius:'0'}
        ];
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
            { fontSize: 36 }
        ];
        break;
    }
    case 'p': {
        tmp = [
            { backgroundColor: 'rgba(0,0,0,0)' },
            { color: '#000000' },

            { fontWeight: 700 },
            { fontStyle: 'normal' },
            { fontSize: 24 }
        ];
        break;
    }
    case 'span': {
        tmp = [
            { backgroundColor: 'rgba(0,0,0,0)' },
            { color: '#000000' },

            { fontWeight: 400 },
            { fontStyle: 'normal' },
            { fontSize: 16 }
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
