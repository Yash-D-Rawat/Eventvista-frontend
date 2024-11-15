import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero/Hero'
import UpcomingEvn from '../components/Upcoming_events/UpcomingEvn'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import HostSection from '../components/Hero/HostSection';
import Footer from '../components/footer/Footer';
import { testingApi } from '../apiroutes';

function Home() {
  const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState('')
    const fetchProducts = async ()=>{
        try{
            const url = `${testingApi}`
            const headers = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json()
            console.log("Fetch result:", result)
            setProducts(result);
            handleSuccess('Successfully fetched data')
            setLoading(false);
        }catch(err){
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
  return (
    <>
      <Hero />
      
      <UpcomingEvn />
      <HostSection/>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default Home