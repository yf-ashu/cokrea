// import React from 'react';
// import CreateMain from '../js/components/Create/CreateMain';
// // import renderer from 'react-test-renderer';
// // import { MemoryRouter } from 'react-router-dom';
// import { shallow } from 'enzyme';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// // import { shallow } from 'enzyme';

// // jest.mock();
// // jest.mock('../js/components/Create/CreateMain', () => 'CreateMain');
// test('CreateMain', () => {
//     // Render a checkbox with label in the document
      
//     const wrapper = shallow(<CreateMain userData={userData} />);
//     // wrapper.find('.createMainSide--controller').simulate('click');
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
          
//     expect(wrapper.state().contorllSideBar).toEqual(false);
//     // expect(wrapper.props().userData).toEqual(userData);

//     //           CreateMainItem
//     // interviewWrapper = shallow(<InterviewWrapper company={company} />),
//     // tableOfContents = interviewWrapper.find(CreateMainItem)
//     //       interviewContent = interviewWrapper.find(InterviewContent);

// //   expect(tableOfContents.instance().props().company.name).to.equal(company.name);
// });



// // test('Home test', () => {
// //     const userData = {
// //         project: [
// //             {
// //                 contentEditable: false,
// //                 link: '/dashboard/edit/z15z0m01o01g98x',
// //                 projectId: 'z15z0m01o01g98x',
// //                 projectName: 'New Project'
// //             }
// //         ],
// //         providerId: 'google.com',
// //         userEmail: 'yeitree1227@gmail.com',
// //         userId: 'Q40OMsyz9EP4uhxVfxKDKBgGg0U2'
// //     };

// //     const component = renderer.create(
// //         <MemoryRouter>
// //             <CreateMain
             
// //                 userata={userData}
// //             />
// //         </MemoryRouter>
// //     );
// //     let tree = component.toJSON();
// //     expect(tree).toMatchSnapshot();
// //     tree.props.userData;
// //     // re-rendering
// //     tree = component.toJSON();
// //     expect(tree).toMatchSnapshot();

// //     // manually trigger the callback
// //     // tree.props.onMouseLeave();
// //     // re-rendering
// //     // tree = component.toJSON();
// //     // expect(tree).toMatchSnapshot();
// // });
