API endpoints:

localhost:2000/api/signup
localhost:2000/api/signin

localhost:2000/api/user/wishlist/add-to-wishlist (add product in wishlist)
localhost:2000/api/user/wishlist (Get wishlist items)

localhost:2000/api/products/:slug (Get products by category)
(Replace ':slug' with any one of the following event as it is)
events = ["bridal-wear", "groom-wear","party-wear", "eid-wear", "casual-wear", "formal-wear"]

localhost:2000/api/products/:cat/:event (Get products by category and event)
localhost:2000/api/image-search (Search product by image)

localhost:2000/api/user/wardrobe (Get user's wardrobe items)
localhost:2000/api/user/wardrobe/removeItem (Remove wardrobe item)
localhost:2000/api/user/wardrobe/trends (Show wardrobe based recommendations)

localhost:2000/api/user/wardrobe/add-preloved-item (Add wardrobe item in preloved, signin require)
localhost:2000/api/preloved-items (Get all preloved items, no signin require)
localhost:2000/api/user/preloved-items/delete-item (delete preloved item, take itemId as input, require signin)

localhost:2000/api/user/user-details (Get user's name and email by id, take user id as input)

--=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=

Explanation:
wardrobe me har item me aik property hy 'preloved' k name sy jo True ya false ho sakti hy. Jab user add to preloved par click kary ga to us button ki jaga remove from preloved ya item sold wala button ajye ga. jesy hi item preloved me add hoti hy 'preloved' ki value false sy true ho jati hy jis ka matlab k ye specific item preloved items me add hogai hoi hy. is property ko UI wagera change karny k liye use kar lai, k jab true ho tab remove from preloved ka button dikhana hy or jab false ho tab add to preloved wala.

screenshots send kar diye hain wo dekh li k kya input deni api ko or response kya hoga.

get preloved items wali api me sary products ki detail ajati hy, us me aik field 'user' hy jo k user id hy. Ye id use ki jye gi user ka name r email fetch karny k liye user details wali api me.
