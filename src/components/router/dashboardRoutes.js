import CreatePost from '../pages/Posts/CreatePost';
import PostList from '../pages/Posts/PostList';
import EditPost from '../pages/Posts/EditPost';
import UserList from '../pages/Users/UserList';
import UserCreate from '../pages/Users/CreateUser';


const dashRoutes = [
    {
        name: 'CreatePost',
        route: '/create-post',
        component: CreatePost,
        exact: true,
    },
    {
        name: 'PostList',
        route: '/post-list',
        component: PostList,
        exact: true,
    },
    {
        name: 'EditPost',
        route: '/edit-post',
        component: EditPost,
        exact: true,
    },
    {
        name: 'UserList',
        route: '/user-list',
        component: UserList,
        exact: true,
    },
    {
        name: 'UserCreate',
        route: '/user-create',
        component: UserCreate,
        exact: true,
    }
];

export default dashRoutes;