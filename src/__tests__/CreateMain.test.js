import React from 'react';
import CreateMain from '../js/components/Create/CreateMain';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

// import { shallow } from 'enzyme';

jest.mock();
jest.mock('../js/components/Create/CreateMain', () => 'CreateMain');
test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  
    expect(checkbox.text()).toEqual('Off');
  
    checkbox.find('input').simulate('change');
  
    expect(checkbox.text()).toEqual('On');
  });



// test('Home test', () => {
//     const userData = {
//         project: [
//             {
//                 contentEditable: false,
//                 link: '/dashboard/edit/z15z0m01o01g98x',
//                 projectId: 'z15z0m01o01g98x',
//                 projectName: 'New Project'
//             }
//         ],
//         providerId: 'google.com',
//         userEmail: 'yeitree1227@gmail.com',
//         userId: 'Q40OMsyz9EP4uhxVfxKDKBgGg0U2'
//     };

//     const component = renderer.create(
//         <MemoryRouter>
//             <CreateMain
             
//                 userata={userData}
//             />
//         </MemoryRouter>
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//     tree.props.userData;
//     // re-rendering
//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();

//     // manually trigger the callback
//     // tree.props.onMouseLeave();
//     // re-rendering
//     // tree = component.toJSON();
//     // expect(tree).toMatchSnapshot();
// });
