import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Blog from './Blog'

afterEach(cleanup);

test('only title and author are shown by default', async () => {
  const blog = {
    author: 'Jack',
    title: 'Pirate life',
    url: 'www.rum-treasure.ga',
    likes: 4
  };

  const component = render(<Blog blog={blog} />)

  const basicView = component.container.querySelector('.basicView')
  expect(basicView).toHaveTextContent('Jack')
  expect(basicView).toHaveTextContent('Pirate life')
  expect(basicView).not.toHaveTextContent('www.rum-treasure.ga')
  expect(basicView).not.toHaveTextContent('likes')
})

test('full details are shown after clicking the div', async () => {
  const blog = {
    author: 'Jack',
    title: 'Pirate life',
    url: 'www.rum-treasure.ga',
    likes: 4,
    user: {
      id: 111
    }
  };

  const user = {
    name: 'Jack Sparrow',
    username: 'LuckyJack',
    id: 111
  }

  const component = render(<Blog blog={blog} user={user} />)
  const basicDiv = component.getByTestId('divBasicView')
  fireEvent.click(basicDiv)

  const expandedDiv = component.getByTestId('divExpandedView')

  expect(expandedDiv).toHaveTextContent('Jack')
  expect(expandedDiv).toHaveTextContent('Pirate life')
  expect(expandedDiv).toHaveTextContent('www.rum-treasure.ga')
  expect(expandedDiv).toHaveTextContent(/likes/i)
})
