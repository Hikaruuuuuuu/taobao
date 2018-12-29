
function Taobao(){

    this.shops = document.getElementsByClassName('shops')[0];
    this.init() 
}

Taobao.prototype.init = function(){

    this.drawing();
    this.clicks()
}

Taobao.prototype.drawing = function(){
    this.ajax({})    
}

Taobao.prototype.clicks = function(){
    var auto = document.querySelector('.auto'),  //默认排序
        priceUp = document.querySelector('.priceUp'), //价格升序
        priceDown = document.querySelector('.priceDown'), // 价格降序
        sales = document.querySelector('.sales'),  // 销量
        that = this,
        cut = document.querySelector('.cut');  // 切换

        auto.onclick = function(){
            that.ajax("name=shy") 
        }
}

Taobao.prototype.ajax = function(data){
    var xhr = new XMLHttpRequest(),
        that = this;
        xhr.open('get', 'http://localhost:8888/getData', true)
        //xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data)
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status == 200){
                var data = xhr.responseText;
                data = JSON.parse(data).data;
                
                var html = "";
                data.forEach((file) => {
                    html += `<dl>
                                <dt><img src=${file.img}></dt>
                                <dd>
                                    <p><span class="name">${file.name}</span></p> 
                                    <p>价格:<span class="price">${file.price}</span></p>
                                    <p>销量:<span class="sales">${file.sales}</span></p>
                                </dd>
                            </dl>`
                });
                that.shops.innerHTML = html;
                
            }
        }
}