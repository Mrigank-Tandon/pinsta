<template>
    <div class="header">
    <div class="nav">
             <div class="navbar-partition">
                 <router-link to="/userFeed"><img src="../assets/pinstagram.jpg" class="logo"/></router-link>
                <input type="text" class="search" placeholder="Serch here" v-model="search">
                <button @click="handleSearchClick(filteredPosts)" class="search-btn">&#128269;</button>
               
             </div>

             <div class="navbar-partition">
             <router-link to="/userNotification"><font-awesome-icon icon="fa-regular fa-heart" class="icons"/></router-link>             
<router-link to="/userProfile"><font-awesome-icon icon="fa-regular fa-user-circle" class="icons"/></router-link>
<font-awesome-icon icon="fa-regular fa-arrow-alt-circle-right" class="icons" />      
             </div>

        </div>     
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: "searchBar",
  components: {
    
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    filteredPosts() {
      return this.getUser.filter(post =>
        post.name.includes(this.search),
        console.log(this.getUser)
      );
    }
  },
  methods: {
          ...mapActions(['handleUser']),
          getAllUsers(){
              this.handleUser();
          },
      handleSearchClick(value){
         this.$router.push({name: 'searchBar', params: {property:value}});
        },
  },
   
    
    mounted() {
    if (sessionStorage.getItem("User")) {
      this.details = JSON.parse(sessionStorage.getItem("User"));
    }
  },
  created() {
    if (sessionStorage.getItem("User")) {
      this.details = JSON.parse(sessionStorage.getItem("User"));
    }
    this.getAllUsers();
  },
    
};
</script>


<style scoped>

.icons{
    width:28px;
    height: 28px;
    text-decoration: none;
    margin: auto 10px;
    color: #000;
}

.logo{
    width: 130px;
    height: 50px;
}

.nav{
    display: flex;
    justify-content: space-around;
}

.header{
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    z-index: 3;
    width: 100%;
}


.logo_image{
    height: 70px;
    width: 80px;
}

.navbar-partition{
    display: flex;
    align-items: center;
    justify-content: space-around;
}


.links{
    text-decoration: none;
    color: rgb(100, 100, 100);
    display: flex;
    align-items: center;
    margin: 0 15px;
    cursor: pointer;
}

.navbar_images{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    align-items: center;
}


.search{
    padding: 9px;
    border: 1px solid rgb(179, 179, 179);
}

.search-btn{
  background-color: #fff;
  cursor: pointer;
  padding: 8px;
  border: 1px solid rgb(179, 179, 179);
}

@media screen and (max-width:500px) {
  .header{
    width: 100%;
  }
}



</style>

