import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('renders blog title, likes and author', () => {
  const blog = {
    author: 'Jack',
    title: 'Pirate life',
    likes: 4
  };

  const component = render(<SimpleBlog blog={blog} />);

  const infoDiv = component.container.querySelector('.info')
  expect(infoDiv).toHaveTextContent('Jack');
  expect(infoDiv).toHaveTextContent('Pirate life');

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent('blog has 4 likes')
});

test('clicking the like button two times calls the event handler two times', async () => {
  const blog = {
    author: 'Jack',
    title: 'Pirate life',
    likes: 4
  };

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)


})
