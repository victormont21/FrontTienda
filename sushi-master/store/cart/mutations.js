export default {
  LoadCart(state) {
    let cart = localStorage.getItem("myCart");

    if (cart) {
      state.cart = JSON.parse(cart);
    }
  },
  AddToCart(state, product) {
    //Check if item is in cart
    console.log(product)
    let itemfound = false//state.cart.find((p) => p.product.id === product.id);
    console.log(state.cart)

    for(var i = 0;i<state.cart.length;i++)
    {
      console.log(state.cart[i].product.id + " == "+ product.id)
      if(state.cart[i].product.id == product.id )
      {
        itemfound = true
      }
    }

    if(itemfound){
      this.$swal({
        toast: true,
        text: "Producto ya esta en su Carrito",
        icon: "info",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
    }else{
      state.cart.push({ product, quantity: 1 });
      localStorage.setItem("myCart", JSON.stringify(state.cart));
      this.$swal({
        toast: true,
        text: "Agregando al Carrito",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
    }


    /*console.log("itemfound : "+itemfound)
    console.log(itemfound)
    state.cart.push({ product, quantity: 1 });
    if (!itemfound) {
      console.log("!itemfound")
      state.cart.push({ product, quantity: 1 });
    }
    if (itemfound) {
      itemfound.quantity += 1;
    }

    //Update local storage
    localStorage.setItem("myCart", JSON.stringify(state.cart));

    this.$swal({
      toast: true,
      text: "Actualizando Carrito",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
    });*/
  },
  DecreaseItemCount(state, index) {
    let item = state.cart[index];
    if (!item) return;
    if (item.quantity == 1) {
      state.cart.splice(index, 1);
    } else {
      item.quantity -= 1;
      localStorage.setItem("myCart", JSON.stringify(state.cart));
    }
    this.$swal({
      toast: true,
      text: "Actualizando Carrito",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
    });
  },
  RemoveCartItem(state, index) 
  {
    console.log(index)
    state.cart.splice(index, 1);
    
    localStorage.setItem("myCart",JSON.stringify(state.cart))


    this.$swal({
      toast: true,
      text: "Item Removed.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
    });
  },
  IncreaseItemCount(state, index) {
    let item = state.cart[index];
    item.quantity += 1;
    console.log(item)

    localStorage.setItem("myCart", JSON.stringify(state.cart));

    this.$swal({
      toast: true,
      text: "Actualizando Carrito",
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
    });
  },
  ClearCart(state) {
    state.cart = [];
    //Update local storage
    localStorage.removeItem("myCart");
  },
};
