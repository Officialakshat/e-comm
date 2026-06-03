// import { createContext, useState } from "react";

// const WishlistContext = createContext();

// export function WishlistProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);

//   const toggleWishlist = (product) => {
//     setWishlist((prev) => {
//       const exists = prev.find((item) => item.id === product.id);
//       if (exists) {
//         return prev.filter((item) => item.id !== product.id);
//       } else {
//         return [...prev, product];
//       }
//     });
//   };

//   const isWishlisted = (id) => wishlist.some((item) => item.id === id);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, toggleWishlist, isWishlisted }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// // custom hook — use this anywhere
// // export function useWishlist() {
// //   const context = useContext(WishlistContext);
// //   if (!context) {
// //     throw new Error("useWishlist must be used within a WishlistProvider");
// //   }
// //   return context;
// // }
