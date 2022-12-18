<template>
<div>
    <div class="homepage" v-if="user && loggedUser">
        <div class="left-side" v-if="(loggedUser && user)">
            <img src="../assets/logo.png">
            <userCloud :user="loggedUser"/>
        </div>
        <div class="tweets" v-if="(user && loggedUser)">
            <ScrollHeader :message="'Profile'"  :user="loggedUser" id="brCell"
            @cellBar="backDrop = !backDrop"/>
            <ProfileInfo :user="user" :loggedUser="loggedUser" 
            @profileE="backDrop = !backDrop"
            @followE="handleFollow" />
            <transition-group tag="ul" name="list" v-if="tweets.length">
                <li v-for="tweet in tweets" 
                :key="tweet._id"
                class="tweetscontainer">
                    <SingleTweet 
                    :tweet="tweet" :user="loggedUser"
                    :backDrop="backDrop" @responseE="backDrop = !backDrop"
                    @delete="tweets = tweets.filter(twt => twt._id !== tweet._id)"/>
                </li>
            </transition-group>
        </div>
        <div class="right-side">
            <TrendingTags />
        </div>
   </div>
   <div v-else class="loading" ></div>
</div>
    
</template>

<script>
import { ref } from 'vue';
import { usegetUser, useRefresh, useUpdateFollow } from '@/composables/useUserMethods';
import { useGetUserTweets } from '@/composables/useTweetMethods'
import ProfileInfo from '@/components/ProfileInfo.vue';
import userCloud from '@/components/userCloud.vue';
import TrendingTags from '@/components/TrendingTags.vue';
import SingleTweet from '@/components/SingleTweet.vue';
import ScrollHeader from '@/components/ScrollHeader.vue';

export default {
    props: ['id'],
    components: { ProfileInfo, userCloud, TrendingTags, SingleTweet, ScrollHeader },
    setup(props) {
        const tweets = ref([]);
        const user = ref(null);
        const loggedUser = ref(null);
        const backDrop = ref(false);

        const { errorFourU, getUser } = usegetUser();
        const { errorThreeU, refresh } = useRefresh();
        const { errorFour, getUserTweets } = useGetUserTweets();
        const { errorSevenU, updateFollow } = useUpdateFollow()


        setTimeout( () => {
            getUserTweets(props.id)
                .then(data => { tweets.value = data;} )
                .catch(err => console.log(err))

            refresh()
                .then(data => loggedUser.value = data)
                .catch(err => console.log(err))

            getUser(props.id)
                .then(data => {user.value = data})
                .catch(err => console.log(err))
            
            
        }, 1000)

        const handleFollow = async (e) => { 
            let unfollow = null;
            if (e.target.classList.contains('unfollow')) unfollow = document.querySelector('.unfollow');
            const info = {
                accessToken: loggedUser.value.accessToken,
                userFollowing: { id: loggedUser.value.userID, following: loggedUser.value.following },
                userFollowed: { id: user.value.userID, followers: user.value.followers }
            }
            if (!unfollow) {
                user.value.followers.push( loggedUser.value.userID )
                loggedUser.value.following.push( user.value.userID )
                await updateFollow(info)
                if ( !errorSevenU.value ) console.log('success');
            } else {
                const idx_follower = loggedUser.value.following.find(id => id === user.value.userID);
                const idx_followed = user.value.followers.find(id => id === loggedUser.value.userID);
                user.value.followers.splice( idx_follower, 1 )
                loggedUser.value.following.splice( idx_followed, 1 )
                await updateFollow(info)
                if ( !errorSevenU.value ) console.log('success');
            }
        }

        return {errorThreeU, errorFour, errorFourU, tweets, user, loggedUser, handleFollow, backDrop}

    }
}
</script>

<style>

</style>