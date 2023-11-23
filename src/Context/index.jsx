import { createContext , useState} from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
    //Shopping Cart - Count
    const [count, setCount] = useState(0)

    //Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Checkout Side Menu - Open/Close
    const [isCheckoutSideMenuOpen, setCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setCheckoutSideMenuOpen(false)

    //Product Detail - Show product
    const [productToShow, setProductToShow] = useState({})

    //Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    return (
        <ShoppingCartContext.Provider value = {{
            count, setCount, isProductDetailOpen, openProductDetail, closeProductDetail, productToShow, setProductToShow, cartProducts, setCartProducts, isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu
        }}>
            { children }
        </ShoppingCartContext.Provider> 
    )
}