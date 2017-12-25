<template>
    <div class="wrapper">
        <v-sidebar></v-sidebar>
        <div class="main-container">
            <v-head></v-head>
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        }
    }
</script>