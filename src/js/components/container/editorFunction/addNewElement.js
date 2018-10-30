import { random , styleSetting } from '../../element/constant';

export const  addNewElement=(state,type,elem,special,editorMain) =>{
    console.log(elem);
    let check;
    if (type.type === 'img' && special !== 'img') {
        check = state.buttonItem.findIndex(object => {
            return object.format[1] === type.format.split(',')[1];
        });
    } else {
        check = state.buttonItem.findIndex(
            object => object.type === type.type
        );
    }
    let array =
    state.display.length === 0 ? [] : JSON.parse(JSON.stringify(state.display));
    let canvaWidthX =
        (editorMain.offsetWidth -
            state.editMainStyle[0].style[0].width) /
        2;

    let width ,height;
    if (special === 'img') {
        width=state.fileUpload.file.width *
            state.buttonItem[check].size.width;
    } else if(type.type==='img'){
        width=state.buttonItem[check].size.width *
            state.editMainStyle[0].style[0].width;
    }else{
        width=state.buttonItem[check].size.width *
            state.editMainStyle[0].style[0].width;
    }

    if (special === 'img') {
        height=state.fileUpload.file.height *
            state.buttonItem[check].size.width;
    } else if(type.type==='img'){
        height=state.buttonItem[check].size.width *
            state.editMainStyle[0].style[0].width;
    }else{
        height=state.buttonItem[check].size.height;
    }
    

    console.log('width:'+width,'height:'+height);
    let textContent =
        type.type === 'img'
            ? 'img'
            : state.buttonItem[check].textContent;
    let randomClass = random();
   
    let style = [
        {
            width: '100%'
        },
        {
            height: '100%'
        }
    ];
    let src;
    if (special === 'img') {
        src = state.fileUpload.imgUrl;
    } else if (type.type === 'img') {
        src = state.buttonItem[check].src;
    } else {
        src = '';
    }
    let tmp = styleSetting(type);
    const value = {
        tag: type.type,
        key: randomClass,
        attribute: {
            className:
                'editorMain__item ' +
                randomClass +
                ' editorMain__item--' +
                type.type,
            id: randomClass,
            format: type.format,
            type: type.type,
            src: src
        },
        textContent: textContent,

        option: [{ contentEditable: 'false' }],

        style: style.concat(tmp),

        outside: [
            {
                width: type.type==='img'?width:'auto'
            },
            {
                height: type.type==='img'?height:'auto'
            },
            {
                left: elem.pageX
                    ? (elem.pageX - canvaWidthX - 60 - width/2)
                    : 0
            },
            {
                top: elem.pageY
                    ? (elem.pageY -
                          100 -
                          (height / 2) *
                              state.editMainStyle[0].scale +
                          editorMain
                              .scrollTop -
                          80) /
                      state.editMainStyle[0].scale
                    : 0
            }
        ]
    };
    array.push(value);
    console.log(value);
    let record={
        old: {
            func: 'addNewItem-display',
            id: [randomClass, array.length - 1],
            value: [{}, '']
        },

        now: {
            func: 'addNewItem-display',
            id: [randomClass, array.length - 1],
            value: [value, '']
        }
    };
    return [array,record];

};
