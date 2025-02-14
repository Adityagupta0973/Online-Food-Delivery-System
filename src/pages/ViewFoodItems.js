import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import Header from '../components/Header';
import AuthContext from '../context/AuthContext';
import './ViewFoodItems.css';
import FoodItem from '../components/FoodItem';
import CartItems from '../components/CartItems';
import CategoryBanner from '../components/CategoryBanner';
import cookingImg from '../assets/CookingSVG.png';
import loadingImg from '../assets/loading.gif';

const ViewFoodItems = () => {
  let { authTokens } = useContext(AuthContext);

  let [foodItems, setFoodItems] = useState([]);
  let [categoryInfo, setCategoryInfo] = useState([]);
  let [cartItems, setCartItems] = useState([]);

  let { id: categoryId } = useParams(); // Get categoryId from URL params
  
  // To display a user's total cart amount
  let [totalAmount, setTotalAmount] = useState(0.00);
  // To disable add/remove from cart buttons till API gets back a response
  let [disableBtn, setDisableBtn] = useState(false);

  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect runs the following methods on each load of page
  useEffect(() => {
    // To fetch the food items of a category
    let getFoodItems = async () => {
      setLoading(true);
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/category/${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      setLoading(false);

      if (response.status === 200) {
        setFoodItems(data);
      } else {
        alert('ERROR: While loading the food items', response);
      }
    };

    // To fetch the info of the requested category (like name, address)
    let getCategoryInfo = async () => {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/category/info/${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setCategoryInfo(data);
      } else {
        alert('ERROR: While loading the category info', response);
      }
    };

    // To get the cart items of the logged in user
    let getCartItems = async () => {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-cart-items/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        setCartItems(data);
        // If the user's cart is not empty, then get the cart's total amount from backend and store it
        if (data[0]?.totalAmount !== undefined) {
          setTotalAmount(parseFloat(data[0].totalAmount));
        }
      } else {
        alert('ERROR: While loading cart items', response);
      }
    };

    getCartItems();
    getCategoryInfo();
    getFoodItems();
  }, [authTokens, categoryId]);

  // To add an item to cart
  let addToCart = async(food) =>{
    // Disable add to cart btn till the API returns a response
    setDisableBtn(true)

    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/add-to-cart/${food.id}`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            // Provide the authToken when making API request to backend to access the protected route of that user
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })

            
    let data = await response.json()
    if(response.status === 200){
        
        const exist = cartItems.find((x) => x.food.id === food.id);

        // If the food item already exists in cart, then increase its quantity
        if(exist) {
            setCartItems(cartItems.map( (x) => (
                x.food.id === food.id 
                ? {...exist, qty : parseInt(exist.qty) + 1, amount : parseFloat(exist.amount) + parseFloat(exist.food.price)} 
                : x
            )))
            
        }
        // If the food item is not already in cart (a new food is added to cart), then add the food details with quantity=1
        else{
            setCartItems([...cartItems, { id: data.id, qty:1, user: data.user, food: data.food, amount: parseFloat(data.food.price) }] )
        }
        //Update the user's cart's total amount by adding the added food item's price to the total amount
        var newTotalAmount = parseFloat(totalAmount) + parseFloat(food.price)
        setTotalAmount(parseFloat(newTotalAmount))
    } else {
        alert(data)
    }
    setDisableBtn(false)
}


 // To remove an item from cart
 let removeFromCart = async(food) =>{
    // Disable remove from cart btn, till the API returns a response
    setDisableBtn(true)

    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/remove-from-cart/${food.id}`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            // Provide the authToken when making API request to backend to access the protected route of that user
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    

    if(response.status === 200){
        const exist = cartItems.find((x) => x.food.id === food.id);
        // If the food item's qty is 1, then delete the item from cart
        if(exist.qty === 1) {
            //console.log('QTY 0')
            setCartItems(cartItems.filter( cart => cart.food.id !== food.id ))
        }
        // If the food item already exists in cart, then decrease its quantity
        else{
            setCartItems(cartItems.map( (x) => (
                x.food.id === food.id 
                ? {...exist, qty : parseInt(exist.qty) - 1, amount : parseFloat(exist.amount) - parseFloat(exist.food.price)} 
                : x
            )))
        }

        //Update the user's cart's total amount by subtracting the removed food item's price from total amount
        var newTotalAmount = parseFloat(totalAmount) - parseFloat(food.price)
        setTotalAmount(parseFloat(newTotalAmount))

    } else {
        alert('ERROR: Removing Item to cart ')
    }

    setDisableBtn(false)
}


  return (
    <div>
      <Header />
      <CategoryBanner categoryInfo={categoryInfo} />
      <div className="row">
        <div className="left">
          <img src={cookingImg} className="cookingImg" alt="cookingImg" />
          <p>Good food is the foundation of genuine happiness</p>
        </div>

        <div className="middle">
          {loading ? (
            <div>
              <img
                src={loadingImg}
                style={{ width: 50, marginTop: 25, marginLeft: 25 }}
                alt="loading"
              />
              <p style={{ fontSize: 24, marginLeft: 25 }}>
                Getting category's food. Please wait . . .
              </p>
            </div>
          ) : (
            <div>
              {foodItems.length === 0 ? (
                <div className="noItemNotice">
                  ☹️ No food items added by this category.
                  <br />
                  Try visiting some other category's page!
                </div>
              ) : null}
            </div>
          )}

          {foodItems.map((food) => (
            <FoodItem
              food={food}
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              key={food.id}
              disableBtn={disableBtn}
            />
          ))}
          <hr />
        </div>

        <div className="right">
          <CartItems
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            totalAmount={totalAmount}
            navigate={navigate}
            disableBtn={disableBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewFoodItems;
