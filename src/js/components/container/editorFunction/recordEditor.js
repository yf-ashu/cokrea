export const recoveryItem=(parameter) =>{

    let action=parameter[0].func.split('-');
    let {id, value}=parameter[0];
    let state=parameter[1];
    let  copy = JSON.parse(JSON.stringify(state));

    if (action[1] === 'display') {
        if (action[0] === 'addNewItem') {
            copy.splice(id[1], 1);
        } else if (action[0] === 'changeLayer') {
            let previous = copy[id[0]];
            let now = copy[id[1]];
            copy[id[0]] = now;
            copy[id[1]] = previous;
        } else if (action[0] === 'changeLayerDelete') {
            let find = state.findIndex(data => {
                return data.key === id[0];
            });
            if (find < 0) {
                copy.splice(id[1], 0, value[0]); //生成
            }
        } else {
            let find = state.findIndex(data => {
                return data.key === id[0];
            });
            if (find >= 0) {
                copy[find][value[1]] = value[0];
            } else {
                let trash = Object.assign({},state.trashCan[id[0]]);

                copy.splice(trash.id[1], 0, trash.value[0]);
                copy[trash.id[1]][value[1]] = value[0];
            }
        }
    } else {
        copy[0][value[1]] = value[0];
    }

    return [[action[1]], copy];
};
export const redoItem=(parameter)=> {
    let action=parameter[0].func.split('-');
    let {id, value}=parameter[0];
    let state=parameter[1];
    let  copy = JSON.parse(JSON.stringify(state));

    if (action[1] === 'display') {
        if (action[0] === 'addNewItem') {
            let find = [action[1]].findIndex(data => {
                return data.key === id[0];
            });
            if (find < 0) {
                copy.splice(id[1], 0, value[0]); //生成
            }
        } else if (action[0] === 'changeLayer') {
            let previous = copy[id[0]];
            let now = copy[id[1]];
            copy[id[0]] = now;
            copy[id[1]] = previous;
        } else if (action[0] === 'changeLayerDelete') {
            copy.splice(id[1], 1);
        } else {
            let find = state.findIndex(data => {
                return data.key === id[0];
            });
            if (find >= 0) {
                copy[find][value[1]] = value[0];
            } else {
                let trash = Object.assign({}, state.trashCan[id[0]]);

                copy.splice(trash.id[1], 0, trash.value[0]);
                copy[trash.id[1]][value[1]] = value[0];
            }
        }
    } else {
        copy[0][value[1]] = value[0];
    }
    return [[action[1]], copy];

};