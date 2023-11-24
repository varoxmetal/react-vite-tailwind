import { createContext , useState, useEffect } from 'react'

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

    //Shopping Cart - Order 
    const [order, setOrder] = useState([])

    //Get Products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    //Get Products - By Title
    const [searchByTitle, setSearchByTitle] = useState(null)

    //Get Products - By Category
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {
        fetch ('https://api.escuelajs.co/api/v1/products')
        .then (response => response.json())
        .then (data => setItems(data))
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filteredBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType) {
            return items
        }
    }

    useEffect(() => {
        if(searchByTitle && searchByCategory) setFilteredItems(filteredBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if(searchByTitle && !searchByCategory) setFilteredItems(filteredBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if(!searchByTitle && searchByCategory) setFilteredItems(filteredBy('BY_CATEGORY', items, searchByCategory, searchByCategory))
        if(!searchByTitle && !searchByCategory) setFilteredItems(filteredBy(null, items, searchByCategory, searchByCategory))
    }, [items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value = {{
            count, setCount, isProductDetailOpen, openProductDetail, 
            closeProductDetail, productToShow, setProductToShow, cartProducts, 
            setCartProducts, isCheckoutSideMenuOpen, openCheckoutSideMenu, 
            closeCheckoutSideMenu, order, setOrder, items, setItems, searchByTitle, 
            setSearchByTitle, filteredItems, setFilteredItems, searchByCategory, 
            setSearchByCategory
        }}>
            { children }
        </ShoppingCartContext.Provider> 
    )
}