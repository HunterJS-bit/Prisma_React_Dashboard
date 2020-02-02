import CreatePost from '../pages/Posts/CreatePost';
import PostList from '../pages/Posts/PostList';
import EditPost from '../pages/Posts/EditPost';
import UserList from '../pages/Users/UserList';
import CreateUser from '../pages/Users/CreateUser';
import Analytics from '../pages/Analytics/AnalyticsPage';


const dashRoutes = [
    {
        name: 'Analytics',
        route: '/analytics',
        component: Analytics,
        exact: true,
    },
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
        component: CreateUser,
        exact: true,
    }
];

export default dashRoutes;