<template>
  <div class = "main" >
   <div @click="handleUserClick(userDetails.userId)" v-for="userDetails in property" :key="userDetails" class="hello">
         
         <img class="photo" :src="userDetails.userDp" alt="" />
         <h4 class="details">{{userDetails.userName}}</h4>
         
    </div>
  </div>
</template>

<script>
export default {
 name: 'searchBar',
 props: [
     'property'
 ],
  methods:{
      handleUserClick(userId){
            this.$router.push(`userDetails/${userId}`)
            console.log(userId)
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