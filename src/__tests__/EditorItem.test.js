import React from 'react';
import EditorItem from '../js/components/Editor/EditorItem';
import sample from '../js/components/element/sample.json';
import {initFirebase} from '../js/components/element/auth';
import firebase from 'firebase/app';
require('firebase/database');
require('firebase/storage');
const Enzyme = require('enzyme');
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

describe( 'EditorItem tests', () => {
    let smapleData=sample.sample.sample1.display[0];
    initFirebase();
    let database = firebase.database();

    it( 'data is acquired from firebase correctly', done => {
        database
            .ref('/projectData/testData')
            .on('value', snapshot => {
                // let data = snapshot.val();
              
                // console.log(data);

                done();
            });
    });


    let wrapper = mount( <EditorItem 
        key={smapleData.key}
        tag={smapleData.tag}
        attribute={smapleData.attribute}
        outside={Object.assign({}, ...smapleData.outside)}
        option={Object.assign({}, ...smapleData.option)}
        style={Object.assign({}, ...smapleData.style)}
        onMouseDown={jest.fn()}
        onBlur={jest.fn()}
        onDoubleClick={jest.fn()}
        textContent={smapleData.textContent}
    
    /> );
    wrapper.update();
    it( 'EditorItem is rendered correctly' , () => { 
        expect(wrapper).toMatchSnapshot();
    });
    it( 'EditorItem outside toHaveProperty' , () => { 
        expect(wrapper.props().outside).toHaveProperty('width' ,expect.any(Number));
        expect(wrapper.props().outside).toHaveProperty('height' ,expect.any(Number));
        expect(wrapper.props().outside).toHaveProperty('left' ,expect.any(Number));
        expect(wrapper.props().outside).toHaveProperty('top' ,expect.any(Number));
    });

});

