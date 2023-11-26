const addDishToCart = (state, newItem) => {
  const currentCartDishIds = state.cartItems.cartItemIds;
  const currentCartDishData = state.cartItems.cartItemsData;

  const updatedCartItemIds = [...currentCartDishIds, newItem.itemId];

  const updatedCartItems = {
    ...currentCartDishData,
    [`${newItem.itemId}`]: { ...newItem },
  };
  /* new state */
  return {
    cartItemIds: updatedCartItemIds,
    cartItemsData: updatedCartItems,
  };
};

/* 

gets current cart state and submits new state to the cartItems

*/

const handleQuantiyUpdate = (state, id, quantityInCart) => {
  const currentCartItemIds = state.cartItems.cartItemIds;
  const currentCartItemData = state.cartItems.cartItemsData;

  let updateByQuantity;
  if (quantityInCart === 0) {
    const newItemsId = currentCartItemIds.filter(
      (cartItemId) => cartItemId !== id
    );

    let newItemsData0 = { ...currentCartItemData };
    delete newItemsData0[`${id}`];

    updateByQuantity = {
      cartItemIds: newItemsId,
      cartItemsData: newItemsData0,
    };
  } else {
    const newItemsData = {
      ...currentCartItemData[`${id}`],
      quantity: quantityInCart,
    };

    updateByQuantity = {
      cartItemIds: [...currentCartItemIds],
      cartItemsData: {
        ...currentCartItemData,
        [`${newItemsData.itemId}`]: newItemsData,
      },
    };
  }

  return updateByQuantity;
};

const removeDishFromCart = (state, itemToRemoveId) => {
  const updatedIds = state.cartItems.cartItemIds.filter(
    (item) => item !== itemToRemoveId
  );

  let updatedData = {
    ...state.cartItems.cartItemsData,
  };
  delete updatedData[`${itemToRemoveId}`];

  return {
    cartItemIds: updatedIds,
    cartItemsData: updatedData,
  };
};

export { removeDishFromCart, handleQuantiyUpdate, addDishToCart };
