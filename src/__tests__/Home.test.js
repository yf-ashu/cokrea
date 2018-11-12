import React from 'react';
import Home from '../js/components/container/Home';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

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
            />
        </MemoryRouter>
     

    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
