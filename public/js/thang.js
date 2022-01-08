
    const user=document.querySelector('input[name="user"]').value
    const addCartBtn=document.querySelectorAll('.shopping-cart')

    const getToast=(e)=>{  // get Toast message
        Toastify({
            className:'toastify-custom',
            text: "Thêm vào giỏ hàng thành công",
            avatar:e.target.dataset.image,
            duration: 2500,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
    const fetchCart=(data)=>{ // update cart item edit (sub , add , delete)
        fetch(`${window.location.origin}/cart/update`,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        })
    }
    const fetchCart2=()=>{ //update length cart (fetch api)
        console.log('fetch cart')
        fetch(`${window.location.origin}/cart/length`)
        .then(res=>res.json())
        .then(res=>{
            localStorage.setItem('length',JSON.stringify({length:res.length}))
            document.querySelector('.cart-length').innerHTML=res.length
        })
    }
    const updateCartLength2=()=>{  // update length cart user
        if(user!=='false'){
            let item=JSON.parse(localStorage.getItem('length'))
            if(item){
                document.querySelector('.cart-length').innerText=item.length
            }
            else{
                fetchCart2()
            }
        }
        else{
            let item=JSON.parse(localStorage.getItem('cart'))
            if(!item){
                document.querySelector('.cart-length').innerText=0
            }
            else{
                document.querySelector('.cart-length').innerText=item.cart.length
            }
        }
    }
    updateCartLength2()
    addCartBtn.forEach(item=>{
        item.addEventListener('click',(e)=>{
            e.preventDefault()
            if(user!=='false'){
                fetch(`${window.location.origin}/cart/add`,{
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    method:'POST',
                    body:JSON.stringify({id:e.target.dataset.id,user:user,quantity:1,size:e.target.dataset.size})
                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    if(res.success){
                        getToast(e)
                        fetchCart2()
                    }
                })
            }
            else{
                let cart=JSON.parse(localStorage.getItem('cart'))
                console.log(cart)
                let newCartItem={
                    product:e.target.dataset.id,
                    infor:{
                        size:e.target.dataset.size,
                        quantity:1
                    }
                }
                if(!cart){
                    let newCart=[newCartItem]
                    let cart={
                        cart:newCart
                    }
                    localStorage.setItem('cart',JSON.stringify(cart))
                    document.querySelector('.cart-length').innerHTML=1
                }
                else{
                    let check=false;
                    for(let i=0;i<cart.cart.length;i++){
                        if(cart.cart[i].product===e.target.dataset.id){
                            console.log(' co vo day hong')
                            if(cart.cart[i].infor.size===e.target.dataset.size){
                                cart.cart[i].infor.quantity+=1
                                console.log('vo day 1')
                            }
                            else{
                                console.log('vo day')
                                cart.cart=cart.cart.splice(i+1,0,newCartItem)
                            }
                            check=true
                            break
                        }
                    }
                    if(!check){
                        cart.cart.push(newCartItem)
                    }
                    localStorage.setItem('cart',JSON.stringify(cart))
                    document.querySelector('.cart-length').innerHTML=cart.cart.length
                }
                getToast(e)
            }
            
        })
    })




