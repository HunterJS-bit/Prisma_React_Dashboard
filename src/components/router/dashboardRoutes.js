import CreatePost from '../pages/Posts/CreatePost';
import PostList from '../pages/Posts/PostList';


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
    }
];

export default dashRoutes;