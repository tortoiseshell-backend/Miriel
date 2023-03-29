import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductListAsync,
  getProductDetailsAsync,
} from '@reducers/productSlice';
import {
  getCartDataAsync,
  initializeProductData,
} from '@reducers/cartSlice';
import { renderCart, hideCart } from '@lib/cartRender';
import logoImage from '@images/ADIDA_logo_white.png';
import CartDisplay from './subComponents/cartDisplay';

function HeaderBar() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(getProductListAsync());
    dispatch(initializeProductData());
    dispatch(getCartDataAsync());
    hideCart();
  }, []);

  function productChangeHandler(event) {
    dispatch(getProductDetailsAsync(event.target.value));
  }

  function renderProductList() {
    const productList = productListData.map((product) => (
      <option value={product.id} key={product.id}>{product.name}</option>
    ));
    productList.unshift(
      <option value="none" key="none" disabled>
        you can use axios
      </option>,
    );
    return productList;
  }

  const productSelector = (
    <div className="max-w-[80%]">
      <select name="productSelector" id="product-selector" className="w-full p-2 border-b-2 border-white bg-transparent text-lg text-white text-clip" defaultValue="none" onChange={productChangeHandler}>
        {renderProductList()}
      </select>
    </div>
  );

  return (
    <div id="header-bar">
      <div className="header-bar fixed w-full max-w-[950px] z-40 overflow-visible">
        <div className="header-bar w-full max-w-[950px] bg-gradient-to-r from-primary-300 to-secondary-300 flex justify-between p-2 pl-4 gap-x-4">
          <div className="my-auto max-w-[40%]">
            <img alt="logo" src={logoImage} className="max-h-8 aspect-auto" />
          </div>
          <div className="max-w-[60%] flex my-auto">
            {productSelector}
            <button type="button" aria-label="link to cart" className="w-[50px] mt-2 ml-4 mr-2"><i className="fa-solid fa-cart-shopping text-white text-xl" onMouseEnter={renderCart} onMouseLeave={hideCart} /></button>
          </div>
        </div>
        <CartDisplay />
      </div>
      <div className="header-bar w-full max-w-[950px] h-14 bg-gradient-to-r from-primary-300 to-secondary-300" />
    </div>
  );
}

export default HeaderBar;
