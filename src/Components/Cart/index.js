import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../AuthWrapper";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Example() {
  const [open, setOpen] = useState(false); // Initially the dialog is closed
  const theme = useTheme(); // Access MUI theme

  const {cart,setCart} = useAuth()
  const [cartRender,setCartRender] = useState([])

  const id = localStorage.getItem("id")

  console.log("Cart", cart)

  // const [cart,setCart] = useState([])
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch("http://localhost:5000/cart/get-cart", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerId: id }), // Pass the correct body structure
        });
        
        console.log("Response:", response);

        if (response.ok) {
          const data = await response.json();
          // console.log("Data: ",data)
          setCartRender(data);
        } else {
          console.error("Failed to fetch cart data.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
  
    fetchAPI();
  }, [cart]);

  
  
  const handleOpenDialog = () => {
    setOpen(true); // Opens the dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Closes the dialog
  };

  return (
    <>
      {/* Button to open the Dialog with ShoppingCartIcon */}
      <ShoppingCartIcon
        onClick={handleOpenDialog}
        sx={{ zIndex: 1100, color: theme.palette.common.white }}
      />

      {/* Dialog Panel */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        className="relative z-[1200]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                style={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#000" : "#fff", // Dark mode black, light mode white
                  color: theme.palette.mode === "dark" ? "#fff" : "#000", // Dark mode text white, light mode text black
                }}
              >
                <div
                  className={`flex h-full flex-col overflow-y-scroll ${
                    theme.palette.mode === "dark"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } shadow-xl`}
                >
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      {/* Title with theme-based text color */}
                      <DialogTitle
                        className={`text-lg font-medium ${
                          theme.palette.mode === "dark"
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={handleCloseDialog} // Close dialog on click
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartRender.map((item) => {
                            const product = item.Product
                            return(
                            
                              <li key={product.ID} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={product.Breed}
                                    src={product.image}
                                    className="size-full object-cover"
                                  />
                                </div>
  
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium">
                                      <h3>
                                        <a
                                          href={product.href}
                                          className={`${
                                            theme.palette.mode === "dark"
                                              ? "text-white"
                                              : "text-black"
                                          }`}
                                        >
                                          {product.Breed}
                                        </a>
                                      </h3>
                                      <p
                                        className={`ml-4 ${
                                          theme.palette.mode === "dark"
                                            ? "text-white"
                                            : "text-black"
                                        }`}
                                      >
                                        {product.Price}
                                      </p>
                                    </div>
                                    <p
                                      className={`mt-1 text-sm ${
                                        theme.palette.mode === "dark"
                                          ? "text-gray-400"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p
                                      className={`${
                                        theme.palette.mode === "dark"
                                          ? "text-gray-400"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      Số lượng: {item.quantity}
                                    </p>
  
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className={`font-medium ${
                                          theme.palette.mode === "dark"
                                            ? "text-indigo-400 hover:text-indigo-300"
                                            : "text-indigo-600 hover:text-indigo-500"
                                        }`}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          })}


                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium">
                      <p
                        className={`${
                          theme.palette.mode === "dark"
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        Subtotal
                      </p>
                      <p
                        className={`${
                          theme.palette.mode === "dark"
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        $262.00
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={handleCloseDialog} // Close dialog on click
                          className={`font-medium ${
                            theme.palette.mode === "dark"
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-500"
                          }`}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                  
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
