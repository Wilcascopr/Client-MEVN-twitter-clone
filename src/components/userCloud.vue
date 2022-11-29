<template>
    <div class="left-bar">
        <div>
            <img src="../assets/home.png" >
            <span>Home</span>
        </div>
        <div>
            <img src="../assets/person.png" >
            <span>Profile</span>
        </div>
        <div>
            <img src="../assets/tag.png" >
            <span>Explore</span>
        </div>
        <nav>
            <div>
                <span v-if="user"> {{user.name}} </span>
                <div v-if="user"> {{user.email}} </div>
            </div>
            <img src="../assets/more_horiz.png">
        </nav>
    </div>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style scoped lang="scss">
.left-bar {
    nav {
        cursor: pointer;
        align-items: center;
        display: flex;
        margin: 10px;
        border-radius: 25px;
        padding: 5px;
        width: fit-content;
        font-size: 14px;
        img {
            width: 2em;
            height: 2em;
            margin-left: 40px;
        } 
    }
    nav:hover {
        background: lightgray;
    }
    > div {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 10px;
        border-radius: 25px;
        width: fit-content;
        padding: 2px;
        img {
            height: 1.5em;
            width: 1.5em;
            margin-right: 10px;
        }
    }
    > div:hover {
        background: lightgray;
    }
}
</style>