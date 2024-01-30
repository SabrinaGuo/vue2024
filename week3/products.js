import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

/* 思路流程 */
/* 
1. 建立假資料
2. 編輯、刪除都需要有一個暫存的 temp，於 data 中先定義，新增與編輯會開同一個彈窗，刪除開另一個彈窗
3. 需要6個function分別執行，開啟編輯燈箱、開啟刪除燈箱、更新/新增資料、刪除資料、彈窗內的新增圖片、彈窗內的刪除圖片
4. 彈窗實體化，寫上開啟與關閉的程式並測試是否正確開啟與關閉
5. 運用假資料在html上正確讀取
6. 建立新產品的按鈕則是開啟編輯彈窗，不會傳入資料至temp
7. 編輯與刪除按鈕，將資料另存在temp中，並與彈窗進行雙向綁定
8. 點擊刪除彈窗中的確認會將資料移除
9. 點擊編輯彈窗中的確認，會先確認 temp 是否已有暫存資料，來判斷是編輯還是新增
10. 新增：則將新資料直接 push 到產品陣列中
11. 編輯：則會去對照產品陣列中 id 與傳入資料的 id 是否一致，一致的話則將傳入新資料取代舊資料
12. 編輯與刪除的彈窗，點擊取消都會清空 temp 資料
13. 彈窗
*/


//model 實體化
var productModal,delProductModal;

const app = createApp({
  data(){
    return{
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'sabrina-api',
      products:[],
      temp: {
        imagesUrl:[]
      },
      picUrl:"",
      isNew:true,
    }
  },
  methods:{
    //確認是否登入
    checkAdmin(){
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(()=>{
          this.getData();//成功登入取值
        })
        .catch((err)=>{ //使用者若無登入直接進入商品頁面，會被導回登入頁面
          console.dir(err,'error check');
          window.location = './login.html';
        })
    },
    //串接自己的 API 產品列表內容
    getData(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((err)=>{
          console.dir(err,"error getData");
          alert(err.response.data.message)
        })
    },
    showEditModel(item){
      console.log("click model",item);
      if(item){
        this.temp = item;
        this.isNew = false
      }else{
        this.isNew = true
      }
      console.log("click model",this.temp,this.isNew);
      productModal.show()
    },
    showDeleteModel(item){
      console.log("click del model",item);
      if(item){
        this.temp = item;
      }
      delProductModal.show()
    },
    updateData(objItem){
      console.log('updateData',objItem);
      if(this.temp.id){ //已有資料，進行更新
        console.log("編輯");
        this.products.forEach((item,idx) => {
          if(item.id === objItem.id){
            this.products[idx] = objItem
          }
        });
      }else{ // 無資料，進行新增
        console.log("新增");
        objItem.id = new Date().getTime()
        objItem.is_enabled = objItem.is_enabled ? 1 : 0 ;
        this.products.push(objItem)
      }
      console.log('updateData done',this.products);
      this.temp = {} //清空
      productModal.hide()
    },
    deletData(id){
      this.products.forEach((item,idx) => {
        if(item.id === id){
          this.products.splice(idx,1)
        }
      });
      this.temp = {} //清空
      delProductModal.hide()
    },
    addPicData(item){
      console.log('addPicData',item.imageUrl);
      this.temp.imageUrl = []
      this.temp.imageUrl.push('')
    },
    deletePicData(item){
      console.log('deletePicData',item);
      this.temp.imageUrl = ''
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'))
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'))

    // 取出 Token ，如果沒有 token 則會出現 401 (unauthorized) 的錯誤
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)sabrinaToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token;

    //確認是否登入，使用者若無登入直接進入商品頁面，會被導回登入頁面
    this.checkAdmin()
  },
})

app.mount('#app');