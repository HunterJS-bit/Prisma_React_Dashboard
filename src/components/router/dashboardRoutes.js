import CreatePost from '../pages/Posts/CreatePost';
import PostList from '../pages/Posts/PostList';
import EditPost from '../pages/Posts/EditPost';


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
    }
];

export default dashRoutes;