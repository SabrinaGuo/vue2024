import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      user:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    login(){
      const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
      // const path = 'sabrina-api'; // 個人 API Path

      axios.post(`${url}/admin/signin`, this.user)
      //成功的結果
      .then((res) => {
        const { token, expired } = res.data;
        //使用 cookie 存取
        document.cookie = `sabrinaToken=${token}; expires=${new Date(expired)}`
        window.location.href = "./products.html";
      })
      //失敗的結果
      .catch((error) => {
        console.dir(error.response); //dir可以協助看error的資訊/response>data>error
      })
    }
  }
}).mount('#app')