
# Routing for Backend Engineer

In the previous article, we talked about different kinds of HTTP methods like GET or POST. They basically describe the intent — like, what they wanna do?

If you missed it somehow, here you can check:

[HTTP Protocol for Beginners - Backend Engineer](https://medium.com/@notcodesid/http-protocol-for-beginners-backend-engineer-243832d0222b)

They kinda express the *what* of a request — like, what they’re tryna do.

---

## What is Routing?

Routing is simply where your intent is headed — where you wanna send the HTTP request.

For example:  
You wanna get the user’s profile info, right? So you use a GET request and hit this route:

```
GET /api/profile/me
```

The server gets that request and sends you back the profile info. Basically, you're just fetching something and that "something" lives at `/api/profile/me`.

![Profile Route Example](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*JwnuMSZUx01z60e3OJeOmw.png)

When you combine both the intent (like GET or POST) and the route (like `/api/profile/me`), the server knows exactly what task to do — run some database stuff if needed, and send back the data.

In short:  
**Routing means connecting a URL to some logic on the server that handles it.**

---

## Example: GET Request

```
GET /api/profile/me
```

This means you’re asking the server:  
**“Hey, give me the profile info.”**

Here’s the backend code that handles this:

```js
app.get('/api/profile/me', (c) => {
  return c.json({
    name: 'Steve Rogers',
    role: 'Captain America',
    team: 'Avengers'
  });
});
```

- `app.get(...)` listens for a GET request at the route `/api/profile/me`  
- `c.json(...)` sends back a JSON response  

**Breakdown:**
- Intent: `GET`  
- Route: `/api/profile/me`  
- Response: Some user data from the server  

---

## Example: POST Request

```
POST /api/profile
```

Now your intent is to send some data to the server — maybe to update your profile.

```js
app.post('/api/profile', async (c) => {
  const body = await c.req.json(); // grabbing the data you sent
  return c.json({
    message: 'Profile updated successfully',
    data: body
  });
});
```

This route takes the data you send (from the request body), and replies back with a message and that same data.

![POST Request](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*u_znzAjtROTMrcmqd1NQZA.png)

---

## What exactly happened in the server?

These two things:

- Intent (`GET` or `POST`)
- Routing (`/api/profile/me`)

are the keys that map to a specific handler on the server.

**Server → Check HTTP method + route → Run specific logic**

---

## Type of Routing

### 1. Static Routing

Static routes don’t have any variable parts in the URL.

(Variable: it’s just a part of the URL that can change like an ID or name so the route can respond with different data each time.)

![Static Route](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JwnuMSZUx01z60e3OJeOmw.png)

---

### 2. Dynamic Routing

It’s called dynamic ’cause the route is flexible — a part of the URL can change based on the request.

Example route:

```
/api/profile/:id
```

If you make a request like:

```
GET /api/profile/101
```

It gives you the profile of the user with ID `101`.

In short:  
**One route, many possible responses, depending on what you pass in the URL.**

![Dynamic Routing](https://miro.medium.com/v2/resize:fit:1002/format:webp/1*qyniS2IQYjKNS3CmJN73mA.png)  
![Dynamic Routing 2](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*uj0eny7wiE4kWRpVT1h2ow.png)

---

### 3. Query Params

Sometimes, we want to send extra data with a GET request, but we can’t send a body like we do in POST.  
That’s where query parameters come in.

They allow us to pass small pieces of data directly in the URL.

```js
app.get('/api/search', (c) => {
  const query = c.req.query('query');
  return c.json({
    message: `You searched for: ${query}`
  });
});
```

Example:

```
/api/profile/me?query=same+value
```

![Query Params](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*imHwmwX-dODQLdBw77VtnQ.png)

---

### 4. Nested Routes

Nested route means one route is “inside” another — it’s like a path that goes deeper.

Example:

```
/api/profile/me/12/posts/101
```

This route has layers:
- `/api/profile/me` – the base route
- `12` – the user ID
- `/posts/101` – post number 101 of that user

It helps organize data in a clean and meaningful way.

![Nested Route](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pd7INvjo1gHDoMy-CrQo-w.png)

---

### 5. Route Versioning

Sometimes APIs change or grow over time. To avoid breaking old apps, we use **versioning**.

Instead of:

```
/api/profile/me
```

We use:

```
/api/v1/profile/me
```

Why is this useful?

Later, we might make a new version with more features. So we create:

```
/api/v2/profile/me
```

Now both versions can live together!

![API V1](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*NxovOOs4UxbEQoekkXIafw.png)  
![API V2](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*RD2dKrLv_uvbb4rz1fHA3Q.png)

---

### 6. Catch-All Routes

Sometimes, users (or you) might hit a route that doesn’t exist.  
To handle that, we use a **catch-all route**.

```js
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
```

- `*` means: match everything not matched before  
- `app.all()` listens to any HTTP method like GET, POST, etc.  
- It sends a helpful error message and shows a list of available routes

![Catch All Route](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*taTglhPJkgr3EHQtAcRGsg.png)

---

That’s It! You now know how server routing makes sense of your requests!
