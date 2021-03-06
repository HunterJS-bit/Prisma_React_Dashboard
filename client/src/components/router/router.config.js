import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import SinglePost from '../pages/Posts/SinglePost';

const routes = [
    {
        'path': '/',
        'component': Home,
        'exact': true
    },
    {
        'path': '/about',
        'component': About
    },
    {
        'path': '/contact',
        'component': Contact
    },
    {
        'path': '/blog',
        'component': Blog
    },
    {
        'path': '/login',
        'component': Login
    },
    {
        'path': '/dashboard',
        'component': Dashboard,
        'private': true
    },
    {
        'path': '/post/:id',
        'component': SinglePost,
    },
    {
        'path': '*',
        'component': NotFound
    }
];

export default routes;