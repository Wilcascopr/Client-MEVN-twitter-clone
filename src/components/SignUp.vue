<template>
    <div class="Sign">
        <img src="../assets/logo.png">
        <h2>Join Twitter today</h2>
        <form @submit.prevent="handleSignup">
            <div class="field">
                <label>Name</label>
                <input type="text" v-model="name">
            </div>
            <div class="field">
                <label>Email</label>
                <input type="email" v-model="email">
            </div>
            <div class="field">
                <label>Password</label>
                <input type="password" v-model="password">
            </div>
            <button>Create account</button>
        </form>
        <div>Have an account already? <span @click="emitToggle">Log in</span></div>
    </div> 
</template>

<script>
import { useSignup } from '@/composables/useUserMethods';
import { ref } from 'vue';

export default {
    setup(props, context) {
        const name = ref('');
        const email = ref('');
        const password = ref('');

        const { error, signup} = useSignup();

        const emitToggle = () => {
            context.emit('toggle');
        }

        const handleSignup = async () => {
            const message = await signup({
                name: name.value, email: email.value, password: password.value
            })
            if (!error.value) console.log(message);
        }

        return { emitToggle, handleSignup, name, email, password }
    }
}
</script>

<style lang="scss">
    .Sign {
        width: 30%;
        padding: 20px 50px;
        border-radius: 7px;
        box-shadow: -1px 1px 4px gray;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            height: 45px;
            width: 45px;
        }
        form {
            width: 100%;
            .field {
                label {
                    display: block;
                    font-size: 10px;
                }
                margin: 10px 0;
                border: 1px solid lightgray;
                border-radius: 3px;
                padding: 5px;
                input {
                    height: 20px;
                }
            }
            .field:focus-within {
                border: 2px solid rgb(29,155,240);
                color: rgb(29,155,240);
            }
            button {
                width: 100%;
                border: none;
                height: 3em;
                margin-top: 50px;
                font-size: 14px;
            }
        }
        div {
            margin-top: 10px;
            font-size: 12px;
            span {
                cursor: pointer;
                font-weight: bold;
                color: rgb(29,155,240);
            }
        }
    }
    @media screen and (max-width: 500px) {
       .Sign {
            width: 100%;
            box-shadow: none;
       } 
    }
</style>