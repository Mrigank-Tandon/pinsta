<template>
<div>
     <navBar />

<div class="feed">
    <div class="userStory">
      <img src="https://picsum.photos/200/200" alt="" class="story">
      <img src="https://picsum.photos/400/300" alt="" class="story">
       <img src="https://picsum.photos/200/200" alt="" class="story">
      <img src="https://picsum.photos/400/300" alt="" class="story">
       <img src="https://picsum.photos/200/200" alt="" class="story">
      <img src="https://picsum.photos/400/300" alt="" class="story">
      <img src="https://picsum.photos/200/200" alt="" class="story">
      <img src="https://picsum.photos/300/250" alt="" class="story">
      <img src="https://picsum.photos/200/200" alt="" class="story">
      <img src="https://picsum.photos/300/250" alt="" class="story">
    </div>
    <div>
    <div class="userFeed">
        <div class="feeds" v-for="post in postDetails" :key="post.id">
        <div class="userDetails">
            <div class="details">
                 <img :src="post.userProfileDetails.userDp" alt="" class="dp" >
            <div>
                <h4>{{post.userProfileDetails.name}}</h4>
            </div>
            </div>
           
            <div>
                <p>20:03</p>
            </div>
        </div>
        <div>
            
                 <img :src="post.postsEntity.mediaType" alt="" class="post">
            </div>
             <div class="input">
        <h3><button @click="handleLike(post.userProfileDetails.userId,post.postsEntity.id,user.id)">Like</button></h3>
        <button @click="viewLikes(post.userProfileDetails.userId,post.postsEntity.id)">View Likes</button>
        <h3>Comment</h3>

    </div>
     <div class="input comment">
        <input v-model="comment" placeholder="Enter the comment" class="comments"/>
        <button @click="handleComment(post.postsEntity.id)" class="add_comment" >Add</button>
        

    </div>
    <button @click="toggle(); showComment(post.postsEntity.id);">Show comments</button>
    <div v-for="comment1 in comments" :key="comment1.id">
    <div v-if="post.postsEntity.id == comment1.postId" >
     <div id="modal" v-show="displayModal">
      <div>
          <div v-for="comment in comments" :key="comment.id">
              <div v-if="comment1.id == comment.id" class="comment_post">
              <img :src="comment.userDp" class="comment_image" />
              <div class="all_details">
              <h4>{{comment.userName}}</h4>
              <p>{{comment.comment}}</p>
              <div v-for="reply in comment.replyList" :key="reply.userId" class="reply_class">
                  <img :src="reply.userDp" class="reply_image" />
              <div class="all_details">
              <h5>{{reply.userName}}</h5>
              <p>{{reply.reply}}</p>
              </div>
              </div>
              <button @click="toggleButton()">Give Reply</button>
              <div v-show="displayButton" class="reply">
                  
                <input v-model="reply" placeholder="Enter the reply" class=""/>
                 <button @click="handleReply(post.postsEntity.id,comment.id)">Reply</button>
              </div> 
              </div>
                            

          </div>
          </div>
      </div>
    </div>
    </div>
    </div>

        </div>
        </div>

   
    </div>
   </div>


</div>
</template>

<script>
import navBar from './navBar.vue'
export default {
  name: 'userFeed',
  components: {
      navBar
  },
  template: '#item',
  data(){
    return{
       user: {},
       postDetails: [],
       comment: '',
      displayModal: false,
      comments: [],
      reply: '',
      displayButton: false
    }
},
created(){
    if (sessionStorage.getItem("User")) {
      this.user = JSON.parse(sessionStorage.getItem("User"))
    }

    this.axios.get(`http://localhost:8083/user-post/user-feed?userId=${this.user.id}`).then((resp) =>
    this.postDetails = resp.data,
    console.log(this.postDetails)
    )

    
},
methods:{
    handleLike(userId, postId, likerId){
        //userId, postId, likerId
        let arr = this.postDetails;
        console.log(arr)
        this.axios.put(`http://localhost:8082/post/update-likes?userId=${userId}&postId=${postId}&likerId=${likerId}`)
    },
    viewLikes(userId, postId){
        this.axios.get(`http://localhost:8082/post/view-likes?userId=${userId}&postId=${postId}`)
        // .then((resp) => {
        //     console.log(resp.data)
        // })
    },

    handleComment(postId){
        this.axios.post(`http://localhost:8082/post/add-comment?userId=${this.user.id}&postId=${postId}&comment=${this.comment}`)
        .then((resp) => {
            console.log(resp)
        });
        this.comment="";
    },

    showComment(postId){
        this.axios.get(`http://localhost:8082/post/fetch-comments?postId=${postId}`)
        .then((resp) => {
            this.comments = resp.data
        })
    },

    toggle() {
      this.displayModal = !this.displayModal;
    },

    toggleButton() {
      this.displayButton = !this.displayButton;
    },

    handleReply(postId,cid){
        this.axios.post(`http://localhost:8082/post/add-reply?userId=${this.user.id}&postId=${postId}&commentId=${cid}&reply=${this.reply}`)
        .then((resp) => {
            console.log(resp)
        });
        this.reply="";

    }
}
}

</script>

<style scoped>

.comment_post{
    display: flex;
    /* align-items: center; */

}

.reply_class{
    display: flex;
    align-items: center;
}

.all_details{
    line-height: 5px;
    margin-left: 20px;
}

.all_details > h4{
    margin-left: 0px;
}
.comment_image{
    width: 50px;
    height: 50px;
    border-radius: 100% ;
    margin:10px 0 0 10px;
}

.story{
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin: 20px 12px;
}

.userStory{
    display: flex;
    overflow: scroll;
    background-color: #fff;
    width: 90%;
    margin: 10px auto;
    border: 1px solid rgb(211, 209, 209);
    border-radius: 5px;
}

.feeds{
    margin: 15px auto;
border: 1px solid rgb(211, 209, 209);
border-radius: 8px;
overflow: hidden;}

.feed{
    width: 70%;
    margin: auto;
}

.userDetails{
    display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: #fff;
   padding: 10px;
}

.userFeed{
       width: 90%;
       margin: 20px auto;
       /* background-color: #fff; */
       border-radius: 10px; 
       overflow: hidden;
}

.dp{
    height: 50px;
    width: 50px;
    border-radius: 100%;
}

h4{
      margin-left: 10px;
}

.details{
    display: flex;
    align-items: center;
}

.post{
    width: 100%;
    height: 500px;
}

.input{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
}



.comments{
    margin: 10px 20px;
    font-size: 18px;
    width: 100%;
    border: none;
    border-bottom: 1px solid rgb(122, 121, 121);
    padding-top:15px ;
}

.reply_image{
    width: 25px;
    height: 25px;
    border-radius: 100%
}
@media screen and (max-width: 790px) {
    .post{
        height: 400px;
    }
}

@media screen and (max-width: 650px) {
    .post{
        height: 300px;
    }
}

@media screen and (max-width: 570px) {
    .post{
        height: 300px;
    }

    .userStory{
        width: 100%;
    }

    .userFeed{
        width: 100%;
    }
    .feed{
        width: 100%
    }

    .story{
        margin: 10px 12px;
    }

    .userDetails{
        padding: 0 10px;
    }
}
</style>