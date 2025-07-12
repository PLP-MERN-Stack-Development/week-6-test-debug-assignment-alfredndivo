// src/tests/integration/PostsList.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import PostsList from './../components/PostsList';

jest.mock('axios');

describe('PostsList Integration', () => {
  it('renders posts fetched from API', async () => {
    const mockPosts = [
      { _id: '1', title: 'Test Post 1' },
      { _id: '2', title: 'Test Post 2' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockPosts });

    render(<PostsList />);

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });
});
