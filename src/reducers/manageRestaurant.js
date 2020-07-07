import cuid from 'cuid';
export const cuidFn = cuid;

export default function manageRestaurants(state = {restaurants: []}, action) {
    let restaurants
    switch (action.type) {
        case 'ADD_RESTAURANT':
    
          const restaurant= {
            id: cuid(),
            text: action.text,
            reviews: []
          }
    
          return { ...state, restaurants: [...state.restaurants, restaurant] }
    
        case 'DELETE_RESTAURANT':
     
          return {...state, restaurants: [...state.restaurants.filter(restaurant => restaurant.id !== action.id)] }

        case 'ADD_REVIEW':

            const review= {
              id: cuid(),
              text: action.review.text,
              restaurantId: action.review.restaurantId
            }

            restaurants = state.restaurants.map(restaurant => {
              if (restaurant.id === review.restaurantId) {
                let reviewedRestaurant = {...restaurant, reviews: [...restaurant.reviews]}
                reviewedRestaurant.reviews.push(review)
                return reviewedRestaurant
              } else {
                return {...restaurant}
              }
            })

          return {...state, restaurants: restaurants }
        
        case 'DELETE_REVIEW':

          restaurants = state.restaurants.map(restaurant => {
            if (restaurant.id === action.restaurantId) {
              let selectedRestaurant = {...restaurant, reviews: [...restaurant.reviews.filter(review => review.id !== action.id)]}
              return selectedRestaurant
            } else {
              return {...restaurant}
            }
          })
     
          return {...state, restaurants: restaurants }
    
        default:
          return state;
      }
}
