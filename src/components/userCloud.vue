<template>
    <div>
        <div class="user-bar">
            <div>
                <span v-if="user"> {{user.name}} </span>
                <div v-if="user"> {{user.email}} </div>
            </div>
            <span>l</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style scoped lang="scss">
.user-bar {
    position: fixed;
    display: flex;
    top: 0;
    border-radius: 25px;
    padding: 5px;
    width: 20%;
    div {
        margin-right: 1px;
    }
}
.user-bar:hover {
    background: lightgray;
}
div {
    width: 100%;
}
</style>