<template>
<div class="container">
        <form action="" class="form" @submit="authentication">
            <span><img src="../assets/pinstagram.jpg" alt="" class="logo"></span>
            <input type="text" placeholder="username" class="password" v-model="userName">
            <input type="password" placeholder="Password" class="password" v-model="password" >
            <input type="submit" class="submit" value="Log In">
            <span class="bottom_text"> By signing in, you agree to our Terms, Data Policy and Cookie Policy.</span>
        </form>
        <div class="login">
            <p>Don't have an account? <router-link to='/userSignUp' class="login_btn">Sign Up</router-link></p>
        </div>

    </div>
</template>

<script>
// import jsforce from 'jsforce';
import qs from 'qs';

export default {
    name: 'userSignIn',
    data(){
        return{
            userName: '',
            password: '',
            // value : "'grant_type':'client_credentials'".stringify()
            // querystring : require('querystring')

        }
    },
    created(){
    

//      this.axios({
//         method: 'post',
//         url: 'http://192.168.2.110:9093/oauth/token',
//         withCredentials: true,
//         crossdomain: true,
//         data: reqData,    
//     headers: { 
//         'Content-Type':'application/x-www-form-urlencoded',
//       "Authorization":"Basic VXNlcjphYWFh"
    
//     }
//   }).then(function (response) {
//     console.log("Heade With Authentication :" + response);
//   })
//   .catch(function (error) {
//     console.log("Post Error : " +error);
//   }); 

        console.log(this.value)
       

    },
    methods: {
        authentication(e){
              e.preventDefault();
                this.axios.get(`http://localhost:8083/user/authenticate?userName=${this.userName}&password=${this.password}`)
                .then((resp) => {
                  if(resp.data != ''){
                    sessionStorage.setItem("User",JSON.stringify(resp.data))
                    this.$router.push('/userProfile')
                    this.$router.go()
                  }else if(resp.data == ''){
                    // this.credentials()
                    console.log('Wrong credentials')
                                    }
                })

                  this.axios.post(`http://192.168.2.110:9093/oauth/token`, qs.stringify({'grant_type':'password',
                  'username':'Amitkumar',
                  'password' :'abcde'}),
        {
        headers: { 'Authorization':'Basic VXNlcjphYWFh',
        'Content-Type':'application/x-www-form-urlencoded'
    }

}).then((resp)=> {
    console.log(resp.data.access_token)
    sessionStorage.setItem("Authorization" , resp.data.access_token);
})
                
            }
    }

}
</script>

<style scoped>

*{
    box-sizing: border-box;
}

.logo{
    width: 240px;
    height: 90px;
    
}
.container{
display: flex;
flex-direction: column;
    align-items: center;
    justify-content: center;
     /* height: 100vh; */
     text-align: center;
}


.form{
    width: 350px;
    padding: 30px 0 ;
    background-color: rgb(255, 255, 255);
    border: rgb(194, 194, 194) 1px solid;
    margin:30px auto 15px auto;
    
}
.top-text, .username, .password, .submit{
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    outline: none;
}
.top-text{
    margin: 30px auto;
    font-size: 17px;
    color: rgb(138, 138, 138);
    font-weight: bold;
    width: 90%;
}
.username, .password{
    font-size: 13px;
    margin-top: 10px;
    padding: 8px;
    background-color: rgb(245, 245, 245);
    width: 80%;
    border: solid 1px rgb(216, 216, 216);
}
.submit{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
    padding: 8px 15px;
    margin: 20px auto;
    width: 80%;
    background-color: #0095f6;
    border: solid 1px rgba(228, 228, 228, 0);
    border-radius: 5px;
    color: rgb(255, 255, 255);
}

.bottom_text{
    font-size: 14px;
    color: #858383;
    font-weight: bold;
}

.login_btn{
    color: #0095f6;
    text-decoration: none;
}

.login{
     color: #858383;
     font-weight: bold;
     background-color: #fff;
     border: solid 1px rgb(194, 194, 194) ;
     width: 350px;
}

.login > p{
    margin: 10px;
}
</style>