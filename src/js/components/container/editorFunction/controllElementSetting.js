
export const  controllElementSetting=(stateItem, object, inner, value, string,state) =>{
    let copy, copyFirst;
    if (stateItem === 'display') {
        let copyDisplay = +state.controllCurrent[2];
        console.log(   JSON.parse(JSON.stringify(state[stateItem])));
        copyFirst = state[stateItem].slice(0);
        copy = copyFirst[copyDisplay];
    } else {
        copyFirst = state[stateItem].slice(0);
        copy = copyFirst[0];
    }
    let find = copy[object].findIndex(data => data[inner]);
    let opt = [];
    let old = Object.assign({}, [...copy[object]]);
    old = Object.keys(old).map((key)=>{
        opt.push(old[key]);
        return old[key];
    });
    if (value !== null) {
        if (find < 0) {
            copy[object].push({ [inner]: value });
        } else {
            copy[object][find] = { [inner]: parseInt(value) };
        }
    }
    if (string !== null) {
        if (find < 0) {
            copy[object].push({ [inner]: value });
        } else {
            copy[object][find] = { [inner]: string };
        }
    }
    let record= {
        old: {
            func: 'controllSetting-' + stateItem,
            id: stateItem === 'display' ? [copy.key, find] : [0, find],
            value: [old, object]
        },

        now: {
            func: 'controllSetting-' + stateItem,
            id: stateItem === 'display' ? [copy.key, find] : [0, find],
            value: [copy[object], object]
        }
    };
    return [copyFirst,record];

};
