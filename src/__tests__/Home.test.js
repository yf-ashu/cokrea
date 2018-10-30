import React from 'react';
import Home from '../js/components/container/Home';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';

// jest.mock('firebase/app');
jest.mock('../js/components/container/Home', () => 'Home');

test('Home test', () => {
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

    const component = renderer.create(
      <MemoryRouter>

                    <Home
                        getUserData={jest.fn(()=>{})}
                        userData={userData}
                        // loginStatus={this.state.loginStatus}
                    />
            </MemoryRouter>
     

    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // manually trigger the callback
    // tree.props.onMouseEnter();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();

});
