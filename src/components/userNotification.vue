<template>
  <div class = "main" >
   <div v-for="request in requests" :key="request.id" class="hello">
         
         <img class="photo" :src="request.userDp" alt="" />
         <h4 class="details">{{request.userName}}</h4>
         <button @click="confirmFollow(request.userId, user.id)">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'userNotification',
    data(){
        return{
           requests: [],
           user: {}
        }
    },
    created() {
        if (sessionStorage.getItem("User")) {
      this.user = JSON.parse(sessionStorage.getItem("User"));
    }
        this.axios.get(`http://localhost:8083/user-post/get-user-details-for-request?userId=${this.user.id}`)
        .then((resp) => {
            this.requests = resp.data
            console.log(resp.data)
        });

        
    },
    methods: {
        confirmFollow(uid,fid){
             this.axios.put(
        `http://localhost:8083/user-post/update-following-list?userId=${uid}&followingId=${fid}`
      );
      
      this.axios.delete(`http://localhost:8083/user-post/delete-request?userId=${fid}&requestId=${uid}`);
      this.$router.go();
        },
        

    }

}
</script>

<style scoped>


.main{
    margin: auto;
    width: 50%;
}

.hello{
    display: flex;
    align-items: center;
    background-color: #fff;
    margin: 10px;
    padding: 0 10px;
    border-radius: 10px;
    border: 1px solid rgb(177, 177, 177);
}

.photo{
    width: 45px;
    height: 45px;
    border-radius: 100% ;
}

.details{
    margin-left: 20px;
}
</style>