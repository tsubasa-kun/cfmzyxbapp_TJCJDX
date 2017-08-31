import index from './pages/index/index.vue';
import resultPage from './pages/resultPage/resultPage.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/resultPage',
            component: resultPage
        }
    ]
};