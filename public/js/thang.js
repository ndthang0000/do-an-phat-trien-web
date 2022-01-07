
    const user=document.querySelector('input[name="user"]').value
    const addCartBtn=document.querySelectorAll('.shopping-cart')
    const fetchCart=(data)=>{
        fetch(`${window.location.origin}/cart/update`,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        })
    }
    const fetchCart2=()=>{
        console.log('fetch cart')
        fetch(`${window.location.origin}/cart/length`)
        .then(res=>res.json())
        .then(res=>{
            localStorage.setItem('length',JSON.stringify({length:res.length}))
            document.querySelector('.cart-length').innerHTML=res.length
        })
    }
    const updateCartLength2=()=>{
        if(user){
            let item=JSON.parse(localStorage.getItem('length'))
            if(item){
                document.querySelector('.cart-length').innerText=item.length
            }
            else{
                fetchCart2()
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
                        let item=JSON.parse(localStorage.getItem('length'))
                        localStorage.setItem('length',JSON.stringify({length:item.length+1}))
                        document.querySelector('.cart-length').innerHTML=item.length+1
                    }
                })
            }
            else{
                console.log(' vod ay')
                let cart=JSON.parse(localStorage.getItem('cart'))
                if(!cart){
                    let newCart=[{
                        product:e.target.id,
                        infor:{
                            size:e.target.dataset.size,
                            quantity:e.target.dataset.quantity
                        }
                    }]
                    localStorage.setItem('cart',JSON.stringify({cart:newCart}))
                }
                else{
                    let checkExist=false
                    cart.forEach(item=>{
                        if(item.product===e.target.dataset.id){
                            checkExist=true
                            item.infor.forEach(it=>{

                            })
                        }
                    })
                    if(!checkExist){
                        cart.push({
                            product:{
                                _id:e.target.dataset.id,
                                imagesUrl:[]
                            },
                            infor:{
                                size:e.target.dataset.size,
                                quantity:e.target.dataset.quantity
                            }
                        })
                    }
                }
            }
            
        })
    })




