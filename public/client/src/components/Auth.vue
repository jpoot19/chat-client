<template>
    <div class="card">
        <div>
          
            <form v-on:submit.prevent="auth" ref="formContainer">
                <div class="form-group">
                    <div class="form-label">Name</div>
                    <div>
                        <input class="form-control" placeholder="Enter your name" type="text" v-model="form.name">
                    </div>    
                   <!-- <div class="form-label">Surname</div>
                   <div>
                       <input class="form-control" placeholder="Enter your surname" type="text" v-model="form.surname">
                   </div> -->
                   
                   <div class="form-label">Email</div>
                   <div>
                       <input class="form-control" placeholder="Enter your email" type="email" v-model="form.email">
                   </div>
                    <!-- <div class="form-label">Phone</div>
                   <div>
                       <input class="form-control" placeholder="Enter your Number phone" type="tel" v-model="form.phone">
                   </div> -->
                <button class="send-button">Enviar</button>
               </div>
           </form>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                form:{
                    name:'',
                    surname:'',
                    email:'',
                    phone:'0000000000',
                    errorMsgs: [],
                },
                emailInputC: ''
            }
        },
        methods: {
            async auth(){
                if(this.isValidForm()){
                      this.doRegister();
                }else{
                     const errorNotification = {
                        type: 'error',
                        title: 'Se encontraron errores en el formulario',
                        list: this.errorMsgs,
                        timeout: true,
                    }
                    this.$store.dispatch('notification/add', errorNotification);
                    console.log(errorNotification);
                }
              
            },
            doRegister(){
                let loader = this.$loading.show({
                    container: this.$refs.formContainer
                });
                this.$store.dispatch('authUser',{
                    name:this.form.name,
                    surname:this.form.surname,
                    email:this.form.email,
                    phone: this.form.phone
                });
               setTimeout(() => {
                    loader.hide()
                }, 30000)
            },
            isValidForm(){
                this.errorMsgs = [];
                let isValid = true;
                if(this.form.name == ''){
                     this.errorMsgs.push('El campo name es requerido');
                    isValid = false;
                }
                 if(this.form.phone == ''){
                     this.errorMsgs.push('El phone name es requerido');
                    isValid = false;
                }
                if(this.form.email == ''){
                    this.errorMsgs.push('El campo email es requerido');
                    isValid = false;
                }else if(!this.validEmail(this.form.email)){
                    this.errorMsgs.push('Formato incorrecto del campo email');
                    isValid = false;
                }
                return isValid;
            },
             validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validateEmail(){
                if(!this.validEmail(this.form.email))
                    this.emailInputCs = 'error';
                else
                    this.emailInputCs = '';
            },
        },
    }
</script>


<style scoped>
    .card{
        position: relative;
        padding: 26px 24px 24px;
        border-radius: 5px;
        text-align: left;
        color: rgb(0, 0, 0);
        box-shadow: rgb(0 0 0 / 10%) 0px 4px 15px 0px, rgb(0 0 0 / 10%) 0px 1px 2px 0px, rgb(48 71 236 / 50%) 0px 2px 0px 0;
        margin: 1rem;
    }
    .form-label{
        margin-bottom: .2rem;
        font-size: 14px;
        line-height: 20px;
    }

    .form-group{
        position: relative;
        padding:.375rem .75rem;
    }
    .form-group input{
        width: 100%;
        height: 40px;
        padding: 11px 40px 11px 16px;
        box-sizing: border-box;
        font-size: 14px;
        box-shadow: rgb(0 0 0 / 7%) 0px 1px 3px 0px inset;
        border: 1px solid rgb(225, 225, 225);
        color: rgb(0, 0, 0);
        border-radius: 4px;
        background: rgb(250, 250, 250);
        appearance: none;
        margin:.375rem 0;
    }
</style>