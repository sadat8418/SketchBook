import { Children, use, useEffect } from "react";
import { set } from "react-hook-form";
import { AuthLayout, Footer } from "./src/components";
import { createBrowserRouter, RouterProvider, useNavigate, useParams } from "react-router-dom";

REAcT

//backend theke data astese kina 
if(req.query.search) {
    products.filter(product => product.name.includes(req.query.search) )
}
 //useState
const[ products, setProducts ] = useState([]);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(true);

return (
    <h2> Number.products are: {products.length} </h2> )

//await korte IIFE
useEffect(() => { 
    ;( async() => {} )() }, [product]);


    await axios.get('/api/products')
    setProducts(response.data);
    try { 
        setLoading(true);
        //some code

        setLoading(false);
    }

    if(loading) {
        return <h1>Loading...</h1>
    }

    //as a obj return or as a array return korte pari
   return {products, error, loading}; 
   return []
   return{ //multiple return 
    {loading && (<h1>Loading...</h1>)},
    {error && (<h1>Error loading products</h1>)},
   }

   //axios is powerful library for making HTTP requests 
   //axios more powerful than fetch

   //cleanup method :
   useEffect er vitor thake 
    return () => {
        //cleanup code
    controller.abort()} //to avoid race conditions(ektar por ekta request er response ashte pare)

    12MEGABLOG
    1. env variable set
    2. appwrite set 
    3. bucket ID permission set , users all permission set
    4. .env to conf.js , to make them all string
    5. auth.js  (appwite set) 

    export class AuthService {... ...}
    const service = new AuthService();
    export default service; 

    return await this.account.createEmailPasswordSession(email, password);
    6. database, querys, storage --> configs.js

    7. Redux  store (only to let store know login kina)
    # reducers : individual actions export korte hoy 

    addTodo , store e add korte HTMLObjectElement, add hoy dispatch theke, you have to dispatch in store

    dispatch --> uses reducer --> to changes value in store 
     onClick{dispatch()} not allowed X
     onClick{()=> dispatch(removeTodo(todo.id))} allowed
     Provider & store lage
     context api e state preserve thake navigator, tai array call ...spread korte hoto 

    # react router dom
    createBrowserRouter  , 
    <RouterProvider router={router}/>
    Link , NavLink to="/" (isActive), Outlet , useParams
    <Header/> 
    <Outlet/>
    <Footer />
    loader : direct api calls eikhan thekei mara jay (click er agei data fetch start hoye jabe)

    8. useNavigate
    button , {children} 
    ...props --> ${className} 
    forwardRef (hook)  ,ref --> login form - login page (Input.jsx)
    react hook form 
    useForm, register, handleSubmit,

    protection : AuthLayout.jsx 
    #main.jsx e kar kar authentication lagbe,  

    TODO: bar bar web request jeno na marte hoy, tai Store ei Post rakha valo

    controller : REact Hook Form 
    justand, context api , redux toolkit doesnot matter . fast reload, score valo 