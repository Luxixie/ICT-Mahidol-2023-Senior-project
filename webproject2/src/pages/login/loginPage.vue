<template>
    <div id="login-div">
        <el-row>
            <el-col id="login-title-col" :span="12" :offset="11">
                <h1 id="login-title">Log in</h1>
            </el-col>
        </el-row>
        <el-form  :label-position="left" id="login-form" ref="loginform" :model="loginform">
            
            <el-form-item label="Email" style="font-weight: bold; color: aliceblue;">
               
                <el-input  id="login-input" placeholder="Email" v-model="loginform.email"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;font-weight: bold; color: aliceblue;" label="Password" >
                <el-input id="login-input" placeholder="Password" show-password v-model="loginform.password"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0px; padding: 0px;">
                <router-link to='./forgetpassword' style="float: right; color: white;">Forget Password?</router-link>
            </el-form-item>
            <el-form-item>
                <el-button round type="warning" @click="TryLogin" style="width: 45%; float: left;">Login</el-button>
                <el-button class="login-bt" round @click="GoRegisterPage"
                    style="width: 45%; float:right;">Register</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginform: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        TryLogin() {
            this.$refs.loginform.validate((valid) => {
                if (valid) { 
                   
                    axios.post('http://127.0.0.1:8088/login', this.loginform).then(res => {
                        console.log(res.data)
                        if (res.data.state == 1) {
                            this.$store.commit("SET_TOKEN", res.data.vData.token);
                            this.$store.commit("SET_UserName", res.data.vData.username);
                            this.$store.commit("SET_Accountid", res.data.vData.accountid);
                            this.$store.commit("SET_Region", res.data.vData.region);
                            this.$store.commit("SET_Birthdate", res.data.vData.birthdate);
                            this.$store.commit("SET_Email", res.data.vData.email);
               
                            this.$router.replace('/home');
                        } else {
                            //alert('Incorrect user name or password!');
                            this.$alert('Incorrect user name or password!', 'Error', {
                                confirmButtonText: 'Next',
                            })
                            return false;
                        }
                    });
                } else {
                    //console.log('Check failure');
                    this.$alert('Check failure', 'Error', {
                        confirmButtonText: 'Next',
                    })
                    return false;
                }
            });

        },
        GoRegisterPage() {
            this.$router.push("/signup");
        }
    },

}

</script>

<style>
.login-bt {
    margin-left: 30px;
}

#login-input {
    background: #1f3d70;
    border-color: #1f3d70;
    border-radius: 100px;
    color: #f5efe0;
}




#login-form {
    margin-left: 38%;
    margin-right: 38%;
}

#login-div {
    margin-top: 8%;
}

#login-title {
    color: wheat;
    font-size: 40px;
}

#login-title-col {
    margin-bottom: 60px;
}
</style>