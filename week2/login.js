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
        console.dir(error); //dir可以協助看error的資訊/response>data>error
        alert(error.data.message) // .catch 的部分可以使用 alert 或 其它彈跳視窗 告知使用者發生錯誤，內容可顯示 err.response.data.message 的訊息，或是自己寫也可以
      })
    }
  }
}).mount('#app')