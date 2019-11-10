import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

afterEach(cleanup)

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));

    const divBasicView = component.container.querySelectorAll('.basicView');
    const loginFormView = component.container.querySelector('.loginFormView');
    expect(loginFormView).toBeDefined();
    expect(divBasicView.length).toBe(0)
  });

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }


    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.loggedInView'));

    const divBasicView = component.getAllByTestId('divBasicView');
    expect(divBasicView.length).toBe(3)
  });
});
