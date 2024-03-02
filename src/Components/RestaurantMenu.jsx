import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    useEffect( () => {
        fetchmenu();
    }, [])

    const fetchmenu = async () => {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6126255&lng=77.04108959999999&restaurantId=10576")
            const json = await data.json();
            console.log(json);
            setResInfo(json.data)
        }
        catch(error){
            console.error("Error fetching the menu: ", error);
        }

    }

    
    if (resInfo === null ){
        return  <Shimmer/>
        
    }
    
    const { 
        name,
        cuisines,  
        costForTwoMessage
    } = resInfo?.cards[0]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    console.log("ItemCards :", itemCards[0].card.info.name);



    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
            <h2>Menu</h2>
            <ol>
                {itemCards.map((item) => (
                    <li key={item.card.info.id}>
                        {item.card.info.name}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default RestaurantMenu;