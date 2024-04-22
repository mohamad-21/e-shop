import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import User from '../../contexts/User';
import AppContext from "../../contexts/AppContext";

const rating_api = `https://electroshop.liara.run/api/product/rate`;

function RatingBox({product_id, rating}) {
  
  const [proRating, setProRating] = useState(rating);
  const { setMessage } = useContext(AppContext);
  const user = useContext(User);

  let ratings = Array.from(Array(5).keys());

  async function handleRate(rate) {
    if(!user.loggedIn) return setMessage('you\'re not authorized');
    const resp = await fetch(rating_api, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        product_id,
        user_id: user.id,
        rating: rate
      })
    });
    const data = await resp.json();
    
    if(resp.ok && resp.status === 200) {
      setMessage(data.message);
      return setProRating(rate);
    }
    setMessage(data.message);
  }

  return (
    <>
      {ratings.map(rate => {
        return (
          <button className="text-orange-300" key={rate} onClick={() => handleRate(rate + 1)}>
            {(rate < proRating) ? <FaStar /> : <FaRegStar />}
          </button>
        )
      })}
    </>
  )

}

export default RatingBox