import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [

]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
});
export default router;