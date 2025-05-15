/**
 * Marvel-Themed API with Hono and Cloudflare Workers
 * 
 * This project demonstrates how to build a Marvel-themed API using 
 * Hono framework and Cloudflare Workers, showcasing different routing techniques.
 * 
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 */

import { Hono } from 'hono';

const app = new Hono();

// Root Route - Welcome Message
app.get('/', (c) => {
  return c.json({
    message: "hello from routing article"
  });
});


// 1. Static Routes
app.get('/api/profile/me', (c) => {
  return c.json({
    name: 'Steve Rogers',
    role: 'Captain America',
    team: 'Avengers'
  });
});

app.post('/api/profile', async (c) => {
  const body = await c.req.json();
  return c.json({
    message: 'Profile updated successfully',
    data: body
  });
});

// 2. Dynamic Routes
// 2. Dynamic Routes
app.get('/api/profile/:id', (c) => {
  const id = c.req.param('id');

  // Dummy data based on user ID
  const users = {
    '1': {
      name: 'Steve Rogers',
      role: 'Captain America',
      team: 'Avengers'
    },
    '2': {
      name: 'Tony Stark',
      role: 'Iron Man',
      team: 'Avengers'
    }
  };

  // Type assertion to tell TypeScript that id is a valid key
  const user = users[id as keyof typeof users];

  if (!user) {
    return c.json({ message: 'User not found' }, 404);
  }

  return c.json({
    message: `Profile fetched for user ID: ${id}`,
    data: user,
  });
});


// 3. Query Parameters
app.get('/api/search', (c) => {
  const query = c.req.query('query');
  return c.json({
    message: `You searched for: ${query}`
  });
});


// 4. Nested Routes
// 4. Nested Route
app.get('/api/profile/me/:userId/posts/:postId', (c) => {
  const userId = c.req.param('userId');
  const postId = c.req.param('postId');

  const dummyUsers = {
    '12': {
      name: 'Steve Rogers',
      role: 'Captain America',
    },
    '34': {
      name: 'Tony Stark',
      role: 'Iron Man',
    }
  };

  const dummyPosts = {
    '101': {
      title: 'Why Shield Still Matters',
      content: 'Even in modern warfare, old-fashioned courage counts.',
    },
    '202': {
      title: 'Suit Upgrade Ideas',
      content: 'Thinking about integrating vibranium into the Mark L armor.',
    }
  };

  const user = dummyUsers[userId as keyof typeof dummyUsers] || { name: 'Unknown', role: 'Unknown' };
  const post = dummyPosts[postId as keyof typeof dummyPosts] || { title: 'Not found', content: 'No content available.' };

  return c.json({
    user,
    post,
    timestamp: new Date().toISOString()
  });
});


// 5. Versioned Routes
app.get('/api/v1/profile/me', (c) => {
  return c.json({
    version: 'v1',
    name: 'Tony Stark',
    role: 'Iron Man'
  });
});

app.get('/api/v2/profile/me', (c) => {
  return c.json({
    version: 'v2',
    name: 'Tony Stark',
    role: 'Iron Man',
    company: 'Stark Industries',
    team: 'Avengers'
  });
});

// 6. Catch-All Route
app.all('*', (c) => {
  return c.json({
    error: 'Route not found',
    availableEndpoints: [
      '/api/profile/me',
      '/api/profile/:id',
      '/api/search?hero=name',
      '/api/profile/:id/powers/:powerId',
      '/api/v1/profile/me',
      '/api/v2/profile/me'
    ]
  }, 404);
});
export default app;
