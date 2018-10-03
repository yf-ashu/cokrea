import h1 from '../../../img/edit.svg';
const Constant = {
    buttonDisplay: {
        text: [
            {
                type: 'h1',
                src:h1,
                size: { width: 0.8, height: 75 },
                textContent:
                    'Lorem ipsum dolor sit .',
                format: 'text'
            },
            {
                type: 'h2',
                src:h1,
                size: { width: 0.8, height: 55 },
                textContent:
                    'Lorem ipsum dolor, sit amet .',
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
                src:h1,
                size: { width: 0.8, height: 65 },
                format: 'text',
                textContent:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, sunt laboriosam ea omnis obcaecati incidunt quaerat ipsam a delectus dolore dolorum !'
            }
        ],
        img: [ {
            type: 'img',
            src:h1,
            size: { width: 0.8, height: 0.8 },
            format: 'image'
        }],
        square: []
    }
};

export default Constant;
