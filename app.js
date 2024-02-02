// app.js
const express = require('express');
const app = express();
const port = 3000;

// Sample data for initial testing
let posts = [
    { id: 1, title: 'First Post', content: 'This is my first blog post.' },
    { id: 2, title: 'Second Post', content: 'Another exciting post on my blog!' },
];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Render home page
app.get('/', (req, res) => {
    res.render('home', { posts });
});

// Handle post creation
app.post('/create', (req, res) => {
    const { postTitle, postContent } = req.body;
    const newPost = { id: posts.length + 1, title: postTitle, content: postContent };
    posts.push(newPost);
    res.redirect('/');
});

// Handle post deletion
app.get('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

// Handle post editing form (rendering the form)
app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = posts.find(post => post.id === postId);

    if (postToEdit) {
        res.render('edit', { post: postToEdit });
    } else {
        res.redirect('/');
    }
});

// Handle post update (submitting the form)
app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { postTitle, postContent } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        posts[postIndex].title = postTitle;
        posts[postIndex].content = postContent;
    }

    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
