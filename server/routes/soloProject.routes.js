const UserController = require('../controllers/user.controller');
const PostController = require('../controllers/post.controller');
const SessionController = require('../controllers/session.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    //Routes for Post of work
    app.get('/api/posts', PostController.getPosts);
    app.get('/api/posts/:id', PostController.getPostById);
    app.post('/api/posts', PostController.createPost);
    app.put('/api/posts/:id', PostController.updatePost);
    app.delete('/api/posts/:id', PostController.deletePost);
    //Routes for Photo session
    app.get('/api/sessions', SessionController.getSessions);
    app.get('/api/sessions/:id', SessionController.getSessionById);
    app.get('/api/sessionsbyuser/:userName', SessionController.getSessionsByUser)
    app.post('/api/sessions', SessionController.createSession);
    app.put('/api/sessions/:id', SessionController.updateSession);
    app.delete('/api/sessions/:id', SessionController.deleteSession);
    //User routes
    app.post("/register", UserController.register);
    app.post("/login", UserController.login);
    app.post("/logout", UserController.logout);
    app.get("/users", UserController.getLoggedInUser);
    //Admin routes
    app.get("/admin/users", UserController.getUsers);
    app.post("/admin/register", UserController.adminRegister);
    app.post("/admin/login", UserController.adminLogin);
    app.delete("/admin/users/:id", UserController.deleteUser);

};