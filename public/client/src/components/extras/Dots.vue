<template>
    <div id="wave">
<span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    </div>
</template>
<style scoped>
    div#wave {
        position: relative;
        margin-top: 14em;
        text-align: center;
        /* width: 100px;
        height: 100px; */
        margin-left: 2em;
        margin-right: auto;
    }
    div#wave .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 3px;
        background: #303131;
        animation: wave 1.3s linear infinite;
    }
    div#wave .dot:nth-child(2) {
        animation-delay: -1.1s;
    }
    div#wave .dot:nth-child(3) {
        animation-delay: -0.9s;
    }
    @keyframes wave {
        0%, 60%, 100% {
        transform: initial;
        }
        30% {
            transform: translateY(-15px);
            }
    }
 
</style>