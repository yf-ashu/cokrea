import React from 'react';
import CreateMainItem from '../js/components/Create/CreateMainItem';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';

// jest.mock('firebase/app');
jest.mock('../js/components/container/Home', () => 'Home');

test('CreateMainItem test', () => {
    const userData = {
        project: [
            {
                contentEditable: false,
                link: '/dashboard/edit/z15z0m01o01g98x',
                projectId: 'z15z0m01o01g98x',
                projectName: 'New Project'
            }
        ],
        providerId: 'google.com',
        userEmail: 'yeitree1227@gmail.com',
        userId: 'Q40OMsyz9EP4uhxVfxKDKBgGg0U2'
    };
    test('CreateMainItem changes the text after click', () => {
        // Render a checkbox with label in the document
        const checkbox = shallow(
        <CreateMainItem
        linkTo="" id="" project=""projectImg=""deleteProject=""
        
        />);
      
        expect(checkbox.text()).toEqual('Off');
      
        checkbox.find('input').simulate('change');
      
        expect(checkbox.text()).toEqual('On');
      });
   
});
