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
      products:[
        {
          id: "-L9tH8jxVb2Ka_DYPwng",
          title: "草莓莓果夾心圈",
          category:"甜甜圈",
          unit: "個",
          origin_price: 150,
          price: 99,
          description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",//產品描述
          content: "尺寸：14x14cm",//說明內容
          is_enabled: 1,
          imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        }
      ],
      temp: {},
      picUrl:""
    }
  },
  methods:{
    showEditModel(item){
      console.log("click model",item);
      if(item){
        this.temp = item;
      }
      console.log("click model",this.temp);
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
      this.temp.imageUrl = item.imageUrl
    },
    deletePicData(item){
      console.log('deletePicData',item);
      this.temp.imageUrl = ''
    },
  },
  watch:{
    picUrl(current){
      
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'))
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'))
  },
})

app.mount('#app');