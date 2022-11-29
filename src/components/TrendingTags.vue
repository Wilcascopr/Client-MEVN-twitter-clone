<template>
    <div>
        <form >
            <div>
                <img src="../assets/search.svg">
                <input type="text" placeholder="Search Twitter">
            </div>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    form {
        margin: 5px 20px;
        > div {
            background: rgb(237, 236, 236);
            padding: 5px;
            display: flex;
            border-radius: 20px;
            align-items: center;
            border: 1px solid lightgray;
            img {
                height: 1.2em;
            }
        }
        > div:focus-within {
            border: 2px solid rgb(29,155,240);
            background: white;
        }
        input {
            padding: 5px;
            border: none;
            width: 90%;
            background: inherit;
        }
        input:focus-visible {
            outline: none;
        }
    }
</style>