<template>
    <div class="embed-responsive embed-responsive-16by9">
        <iframe id="player" type="text/html" width="640" height="360"
            :src="getUrlVideo(url)"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="embed-responsive-item"></iframe>
    </div>
    
</template>

<script>
export default{
    props: {
        url:{
            type: String,
            required: true
        }
    },
    methods: {
        getUrlVideo(url){
            let video = url + '?autoplay=1&mute=1';
            return video;
        }
    },

}
</script>



<style scoped>
    .embed-responsive{
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        overflow: hidden;
    }
    .embed-responsive::before{
        display: block;
        content: "";
    }
    .embed-responsive .embed-responsive-item, .embed-responsive iframe, .embed-responsive embed, .embed-responsive object, .embed-responsive video{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
    .embed-responsive-21by9::before{
        padding-top: 42.8571428571%;
    }
    .embed-responsive-16by9::before{
        padding-top: 56.25%;
    }
    .embed-responsive-4by3::before{
        padding-top: 75%;
    }
    .embed-responsive-1by1::before{
        padding-top: 100%;
    }
 
</style>