<template>
  <div class="container">
        <form action="" class="form" @submit="formSubmit">
            <span><img src="../assets/pinstagram.jpg" alt="" class="logo"></span>
            <span class="top-text">Sign up to see photos and Privates from your friends.</span>
            <input type="text" placeholder="Name" class="username" v-model='name'>
            <input type="text" placeholder="Username" class="username" v-model='userName'>
            <input type="email" placeholder="Email" class="password" v-model='email'>
            <input type="password" placeholder="Password" class="password" v-model='password'>
            <label for="radio">Enter type of Account:</label>
          <div class="new">
            <input
              type="radio"
              id="Public"
              value="Public"
              name="type"
              v-model="picked"
            />
            <section for="Public">Public</section>
          </div>

          <div class="new">
            <input
              type="radio"
              id="Private"
              value="Private"
              name="type"
              v-model="picked"
            />
            <section for="Private">Private</section>

            
          </div>
            <input type="submit" class="submit" value="Sign Up">
            <span class="bottom_text"> By signing up, you agree to our Terms, Data Policy and Cookie Policy.</span>
        </form>
        <div class="login">
            <p>Have an account? <router-link to='/' class="login_btn">Login</router-link></p>
        </div>

    </div>
    
</template>

<script>
export default {
 name: 'userSignUp',
 data() {
     return {
         name: '',
         userName: '',
         email: '',
         password: '',
         picked: '',
         user: {}
     }
 },
 methods: {
     formSubmit(e) {
                e.preventDefault();
                this.axios.post('http://localhost:8083/user/signup', {
                    name: this.name,
                    userName: this.userName,
                    password: this.password, 
                    accType: this.picked.toLowerCase(),
                    email: this.email,
                }).then((resp) => {
                  
                  if(resp.data == ''){
                    console.log('existing')
                  }
                  else{
                    this.user = resp.data
                    this.axios.post(`http://localhost:8083/user-post/set-userid-in-userpost?userId=${this.user.id}`)
                  }
                })
            },
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
    margin: 10px auto;
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
    color: #adadad;
    font-weight: bold;
}

.login_btn{
    color: #0095f6;
    text-decoration: none;
}

.login{
     color: #acabab;
     font-weight: bold;
     background-color: #fff;
     border: solid 1px rgb(194, 194, 194) ;
     width: 350px;
}

.login > p{
    margin: 10px;
}


@media (max-width: 320px) {
    .form{
        width: 100%;
        margin: 0px auto;
        border: none;
    }

    .login{
        width: 100%;
        border: none;
    }
}
</style>