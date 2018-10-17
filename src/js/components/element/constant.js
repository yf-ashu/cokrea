import edit from '../../../img/edit.svg';
import user from '../../../img/user.svg';
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
                textContent: 'Lorem ipsum dolor sit .',
                format: 'text'
            },
            {
                type: 'h2',
                src: h2,
                size: { width: 0.8, height: 55 },
                textContent: 'Lorem ipsum dolor, sit amet .',
                format: 'text'
            },
            {
                type: 'p',
                src: p,
                size: { width: 0.8, height: 65 },
                format: 'text',
                textContent:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, sunt laboriosam ea omnis obcaecati !'
            },
            {
                type: 'span',
                src: span,
                size: { width: 0.8, height: 65 },
                format: 'text',
                textContent:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, sunt laboriosam ea omnis obcaecati incidunt quaerat ipsam a delectus dolore dolorum !'
            }
        ],
        img: [
            {
                type: 'img',
                src: edit,
                size: { width: 0.5, height: 55 },
                format: 'edit'
            },
            {
                type: 'img',
                src: user,
                size: { width: 0.5, height: 55 },
                format: 'user'
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