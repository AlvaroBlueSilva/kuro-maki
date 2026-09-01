let cart=[];
const cartOverlay=document.getElementById('cartOverlay');
const cartItems=document.getElementById('cartItems');
const cartCount=document.getElementById('cartCount');
const cartTotal=document.getElementById('cartTotal');

document.getElementById('openCart').onclick=()=>cartOverlay.classList.add('show');
document.getElementById('closeCart').onclick=()=>cartOverlay.classList.remove('show');
cartOverlay.addEventListener('click',e=>{if(e.target===cartOverlay)cartOverlay.classList.remove('show')});

function addToCart(name,price){const item=cart.find(x=>x.name===name);item?item.qty++:cart.push({name,price,qty:1});renderCart();cartOverlay.classList.add('show')}
function changeQty(i,delta){cart[i].qty+=delta;if(cart[i].qty<=0)cart.splice(i,1);renderCart()}
function renderCart(){let total=0,count=0;cartItems.innerHTML='';if(!cart.length){cartItems.innerHTML='<div class="empty">Tu carrito está vacío.</div>'}cart.forEach((item,i)=>{total+=item.price*item.qty;count+=item.qty;const el=document.createElement('div');el.className='cart-item';el.innerHTML=`<div><h4>${item.name}</h4><p>S/ ${item.price.toFixed(2)}</p></div><div class="qty"><button onclick="changeQty(${i},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${i},1)">+</button></div>`;cartItems.appendChild(el)});cartCount.textContent=count;cartTotal.textContent=`S/ ${total.toFixed(2)}`}
function sendOrder(){if(!cart.length){alert('Agrega productos antes de enviar tu pedido.');return}let total=0;let msg='🔥 *PEDIDO KURO MAKI* 🔥\n\n';cart.forEach(item=>{const sub=item.price*item.qty;total+=sub;msg+=`• ${item.qty}x ${item.name} — S/ ${sub.toFixed(2)}\n`});msg+=`\n💰 *TOTAL: S/ ${total.toFixed(2)}*\n\nNombre:\nDirección / referencia:\nMétodo de pago:`;window.open(`https://wa.me/51926138246?text=${encodeURIComponent(msg)}`,'_blank')}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.menu-card').forEach(card=>card.style.display=(f==='all'||card.classList.contains(f))?'block':'none')}));

const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');toggle.onclick=()=>nav.classList.toggle('show');document.querySelectorAll('.nav a').forEach(a=>a.onclick=()=>nav.classList.remove('show'));
renderCart();
