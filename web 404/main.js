const PRODUCTS = [
  {
    id:1, title:"Classic Oxford Shirt", price:2999, old:3999, img:"assets/oxford.jpg",
    size:["S","M","L","XL"], color:"White", category:"Men", stock:15, rating:4.5
  },
  {
    id:2, title:"Wool Blend Coat", price:5999, old:7999, img:"assets/wool.jpg",
    size:["S","M","L"], color:"Navy", category:"Women", stock:8, rating:4.8
  },
  {
    id:3, title:"Silk Evening Dress", price:4999, old:6999, img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3",
    size:["S","M"], color:"Black", category:"Women", stock:5, rating:4.7
  },
  {
    id:4, title:"Leather Wallet", price:2499, old:3299, img:"assets/leather.jpg",
    size:["One"], color:"Brown", category:"Accessories", stock:25, rating:4.6
  },
  {
    id:5, title:"Slim Fit Chinos", price:3499, old:4499, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3",
    size:["M","L","XL"], color:"Khaki", category:"Men", stock:12, rating:4.4
  },
  {
    id:6, title:"Cashmere Scarf", price:3999, old:4999, img:"assets/scarf.jpg",
    size:["One"], color:"Gray", category:"Accessories", stock:18, rating:4.9
  },
  {
    id:7, title:"Linen Summer Shirt", price:2499, old:3299, img:"https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3",
    size:["S","M","L"], color:"Blue", category:"Men", stock:10, rating:4.3
  },
  {
    id:8, title:"Silk Blouse", price:3499, old:4499, img:"assets/silk.jpg",
    size:["S","M","L"], color:"Cream", category:"Women", stock:7, rating:4.6
  },
  {
    id:9, title:"Canvas Tote Bag", price:1999, old:2499, img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3",
    size:["One"], color:"Navy", category:"Accessories", stock:20, rating:4.5
  }
];

// Helper functions
function $qs(sel){ return document.querySelector(sel) }
function $qa(sel){ return Array.from(document.querySelectorAll(sel)) }

// Theme toggle
function initThemeToggle() {
  const themeToggle = $qs('.theme-toggle');
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// Image slider
function initSlider() {
  const slides = $qa('.slide');
  if (slides.length === 0) return;
  
  const dots = $qa('.dot');
  const prevBtn = $qs('.slider-prev');
  const nextBtn = $qs('.slider-next');
  let currentSlide = 0;
  
  function showSlide(index) {
    if (index < 0) currentSlide = slides.length - 1;
    else if (index >= slides.length) currentSlide = 0;
    else currentSlide = index;
    
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
  
  // Auto-advance slides
  setInterval(nextSlide, 5000);
  
  // Initial slide
  showSlide(0);
}

// FAQ Accordion
function initAccordion() {
  const headers = $qa('.accordion-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');
      
      // Close all accordion items
      headers.forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
      }
    });
  });
}

// Parallax effect
function initParallax() {
  const parallaxElements = $qa('.parallax');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const speed = 0.5;
      
      // Only apply parallax if element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = -(scrollY * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  });
}

// Product rendering
function renderProducts(containerSelector, items = PRODUCTS) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = "";

  items.forEach(p => {
    const div = document.createElement('div');
    div.className = "card fade-in-up";
    div.dataset.id = p.id;
    div.dataset.price = p.price;
    div.dataset.size = p.size.join(",");
    div.dataset.color = p.color;
    const imgUrl = p.img && p.img.trim() !== "" ? p.img : null;

    div.innerHTML = 
      `<div class="card-img" ${!imgUrl ? 'data-placeholder="true"' : ''} style="${imgUrl ? `background-image:url('${imgUrl}')` : ''}">
        ${!imgUrl ? 'No Image' : ''}
      </div>
      <div class="badge">${p.old ? Math.round((1 - p.price / p.old) * 100) : 0}%</div>
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="rating">★ <span class="small muted">${p.rating} (${Math.floor(Math.random() * 100) + 10})</span></div>
        <div class="price-row">
          <div>
            <div class="price-current">Rs. ${p.price.toLocaleString()}</div>
            <div class="price-old small">${p.old ? 'Rs. ' + p.old.toLocaleString() : ''}</div>
          </div>
          <div class="small muted">In Stock: ${p.stock}</div>
        </div>
        <a class="view-btn" href="product.html?id=${p.id}">🛒 View Details</a>
      </div>
    `;

    container.appendChild(div);
  });
}

// Filters
function initFilters(){
  const minEl = $qs('#price-min'), maxEl = $qs('#price-max'), minVal = $qs('#min-val'), maxVal = $qs('#max-val');
  const sizeBtns = $qa('.size-btn'), colorChecks = $qa('.color-check'), catChecks = $qa('.cat-check');

  function apply() {
    let filtered = PRODUCTS.slice();
    
    // Category
    const checkedCats = catChecks.filter(c=>c.checked).map(c=>c.value);
    if(checkedCats.length) filtered = filtered.filter(p=> checkedCats.includes(p.category));
    
    // Price
    const minP = Number(minEl?.value || 0), maxP = Number(maxEl?.value || 10000);
    filtered = filtered.filter(p=>p.price >= minP && p.price <= maxP);
    
    // Size
    const activeSize = sizeBtns.find(b=>b.classList.contains('active'))?.dataset.size;
    if(activeSize){
      filtered = filtered.filter(p=> p.size.includes(activeSize) || activeSize==='One' && p.size.includes('One'));
    }
    
    // Colors
    const checkedColors = colorChecks.filter(c=>c.checked).map(c=>c.value);
    if(checkedColors.length) filtered = filtered.filter(p=> checkedColors.includes(p.color));
    
    renderProducts('.products', filtered);
    
    // Update meta text
    const meta = $qs('.meta');
    if (meta) {
      meta.innerHTML = `Showing <span class="muted">${filtered.length}</span> products`;
    }
  }

  // Attach event listeners
  minEl?.addEventListener('input', ()=>{ minVal.textContent = 'Rs. '+minEl.value; apply() });
  maxEl?.addEventListener('input', ()=>{ maxVal.textContent = 'Rs. '+maxEl.value; apply() });
  
  sizeBtns.forEach(b=> b.addEventListener('click', ()=>{
    sizeBtns.forEach(x=>x.classList.remove('active')); 
    b.classList.add('active'); 
    apply();
  }));
  
  colorChecks.forEach(c=> c.addEventListener('change', apply));
  catChecks.forEach(c=> c.addEventListener('change', apply));
  
  const clearAll = $qs('#clear-all');
  clearAll?.addEventListener('click', ()=>{
    sizeBtns.forEach(x=>x.classList.remove('active'));
    colorChecks.forEach(c=>c.checked=false);
    catChecks.forEach(c=>c.checked=false);
    minEl.value = 0; maxEl.value=10000;
    minVal.textContent='Rs. 0'; maxVal.textContent='Rs. 10,000';
    renderProducts('.products', PRODUCTS);
    
    const meta = $qs('.meta');
    if (meta) {
      meta.innerHTML = `Showing <span class="muted">${PRODUCTS.length}</span> products`;
    }
  });
}

// Cart functionality
const CART_KEY = 'erahh_cart_v1';
function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){return []} }
function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)) }
function addToCart(productId, qty=1, size='M'){
  const cart = getCart();
  const existing = cart.find(i=>i.id===productId && i.size===size);
  if(existing){ existing.qty += qty } else { cart.push({id:productId, qty, size}) }
  saveCart(cart);
  updateCartUI();
  showNotification('Product added to cart!');
}
function removeFromCart(productId, size){
  let cart = getCart();
  cart = cart.filter(i=> !(i.id===productId && i.size===size) );
  saveCart(cart);
  updateCartUI();
  showNotification('Product removed from cart!');
}
function updateQty(productId, size, qty){
  const cart = getCart();
  const item = cart.find(i=>i.id===productId && i.size===size);
  if(item){ item.qty = qty; if(item.qty<=0) removeFromCart(productId,size); else saveCart(cart) }
  updateCartUI();
}

function cartDetails(){
  const cart = getCart();
  return cart.map(ci=>{
    const p = PRODUCTS.find(x=>x.id===ci.id);
    return {...p, qty:ci.qty, chosenSize:ci.size}
  });
}

function updateCartUI(){
  // Update cart count in header
  const cartCountEls = $qa('.cart-count');
  const totalItems = getCart().reduce((s,i)=>s+i.qty,0);
  cartCountEls.forEach(el=>el.textContent = totalItems);
}

// Notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? 'var(--accent)' : 'var(--badge)'};
    color: white;
    border-radius: 8px;
    box-shadow: var(--shadow);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Render Cart Page
function renderCartPage(){
  const list = $qs('.cart-list'); 
  if(!list) return;
  
  const details = cartDetails();
  list.innerHTML = '';
  let subtotal = 0;
  
  details.forEach(d=>{
    subtotal += d.price * d.qty;
    const el = document.createElement('div'); 
    el.className='cart-item fade-in-up';
    el.innerHTML = 
      `<img src="${d.img}" alt="${d.title}">
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-weight:700">${d.title}</div>
            <div class="small muted">Size: ${d.chosenSize} • Color: ${d.color}</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:800">Rs. ${d.price.toLocaleString()}</div>
            <div class="small muted">In Stock: ${d.stock}</div>
          </div>
        </div>
        <div style="margin-top:12px; display:flex; gap:12px; align-items:center">
          <input class="qty" type="number" min="1" value="${d.qty}" data-id="${d.id}" data-size="${d.chosenSize}">
          <button class="remove small" data-id="${d.id}" data-size="${d.chosenSize}">Remove</button>
        </div>
      </div>`;
    list.appendChild(el);
  });

  // Attach events
  $qa('.cart-item .qty').forEach(q=>{
    q.addEventListener('change', e=>{
      const id = Number(e.target.dataset.id);
      const size = e.target.dataset.size;
      const val = Number(e.target.value) || 1;
      updateQty(id,size,val);
      renderCartPage();
    });
  });
  
  $qa('.remove').forEach(b=>{
    b.addEventListener('click', ()=>{ 
      removeFromCart(Number(b.dataset.id), b.dataset.size); 
      renderCartPage(); 
    });
  });

  // Update totals
  const subtotalEl = $qs('.subtotal-amt');
  if(subtotalEl) subtotalEl.textContent = 'Rs. '+subtotal.toLocaleString();
  
  const shippingEl = $qs('.shipping-amt');
  if(shippingEl) shippingEl.textContent = 'Rs. 200';
  
  const totalEl = $qs('.total-amt');
  if(totalEl) totalEl.textContent = 'Rs. '+((subtotal||0)+200).toLocaleString();
  
  // Update order items in checkout
  const orderItems = $qs('.order-items');
  if(orderItems) {
    orderItems.innerHTML = details.map(it=>
      `<div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
        <img src="${it.img}" style="width:64px;height:64px;object-fit:cover;border-radius:6px">
        <div>
          <div style="font-weight:700">${it.title}</div>
          <div class="small muted">Qty: ${it.qty} • Size: ${it.chosenSize}</div>
        </div>
      </div>`
    ).join('');
  }
}

// Product details page
function renderProductDetails(){
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  if(!id) return;
  
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  
  $qs('.prod-title').textContent = p.title;
  $qs('.prod-img').src = p.img;
  $qs('.prod-price-val').textContent = p.price.toLocaleString();
  $qs('.prod-old') && ($qs('.prod-old').textContent = p.old ? 'Rs. '+p.old.toLocaleString() : '');
  $qs('.prod-stock').textContent = 'In Stock: '+p.stock;
  
  // Sizes
  const sizeWrap = $qs('.prod-sizes');
  sizeWrap.innerHTML = p.size.map(s=>
    `<button class="size-btn" data-size="${s}">${s}</button>`
  ).join(' ');
  
  // Add to cart
  $qs('.add-cart').addEventListener('click', ()=>{
    const chosenSize = $qs('.prod-sizes .size-btn.active')?.dataset.size || p.size[0];
    const qty = Number($qs('.prod-qty').value) || 1;
    addToCart(p.id, qty, chosenSize);
  });
  
  // Size selection
  $qa('.prod-sizes .size-btn').forEach(b=> 
    b.addEventListener('click', ()=>{ 
      $qa('.prod-sizes .size-btn').forEach(x=>x.classList.remove('active')); 
      b.classList.add('active'); 
    })
  );
  
  // Share buttons
  const shareFb = $qs('#share-fb');
  const shareWa = $qs('#share-wa');
  
  if (shareFb) {
    shareFb.href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
  }
  
  if (shareWa) {
    shareWa.href = `https://wa.me/?text=${encodeURIComponent(`Check out this product: ${p.title} - ${window.location.href}`)}`;
  }
}

// Checkout form
function initCheckoutForm(){
  const form = $qs('#checkout-form');
  if(!form) return;
  
  form.addEventListener('submit', e=>{
    e.preventDefault();
    
    // Basic validation
    const name = form.name.value.trim();
    const address = form.address.value.trim();
    if(!name || !address){ 
      showNotification('Please complete required fields', 'error'); 
      return; 
    }
    
    // Build order
    const order = {
      id: 'ORD'+Date.now(),
      customer: { 
        name, 
        email: form.email.value, 
        phone: form.phone.value, 
        address,
        city: form.city.value
      },
      items: cartDetails(),
      total: cartDetails().reduce((s,i)=>s + i.price*i.qty,0) + 200,
      createdAt: new Date().toISOString()
    };
    
    // Store order snapshot
    localStorage.setItem('erahh_last_order', JSON.stringify(order));
    
    // Clear cart
    localStorage.removeItem(CART_KEY);
    updateCartUI();
    
    // Redirect
    window.location.href = 'order-confirmation.html';
  });
}

// Order confirmation
function renderOrderConfirmation(){
  const raw = localStorage.getItem('erahh_last_order');
  if(!raw) return;
  
  const o = JSON.parse(raw);
  $qs('.order-id') && ($qs('.order-id').textContent = o.id);
  $qs('.order-name') && ($qs('.order-name').textContent = o.customer.name);
  $qs('.order-total') && ($qs('.order-total').textContent = 'Rs. '+o.total.toLocaleString());
  
  const itemsWrap = $qs('.order-items');
  if(itemsWrap){
    itemsWrap.innerHTML = o.items.map(it=>
      `<div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
        <img src="${it.img}" style="width:64px;height:64px;object-fit:cover;border-radius:6px">
        <div>
          <div style="font-weight:700">${it.title}</div>
          <div class="small muted">Qty: ${it.qty} • Size: ${it.chosenSize}</div>
        </div>
      </div>`
    ).join('');
  }
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize image slider
  initSlider();
  
  // Initialize FAQ accordion
  initAccordion();
  
  // Initialize parallax effect
  initParallax();
  
  // Render products
  renderProducts('.products', PRODUCTS);
  
  // Initialize filters
  initFilters();
  
  // Update cart UI
  updateCartUI();
  
  // Render cart page if needed
  renderCartPage();
  
  // Render product details if needed
  renderProductDetails();
  
  // Initialize checkout form
  initCheckoutForm();
  
  // Render order confirmation if needed
  renderOrderConfirmation();
  
  // Update meta text
  const meta = $qs('.meta');
  if (meta) {
    meta.innerHTML = `Showing <span class="muted">${PRODUCTS.length}</span> products`;
  }
  
  // Smooth scroll for anchor links
  $qa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});