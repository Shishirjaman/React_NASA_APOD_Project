import Main from "./components/Main"
import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal(){
    setShowModal(!showModal)
  }


  useEffect(() => {
    async function fetchAPIData() {

      if (!NASA_KEY) {
        console.error("API Key is missing! Check your .env file and restart Vite.");
        return;
      }

      const url = 'https://api.nasa.gov/planetary/apod' +
      `?api_key=${NASA_KEY}`


      const today = (new Date()).toDateString()
      const localkey = `NASA-${today}`
      if (localStorage.getItem(localkey)){
        const apiData = JSON.parse(localStorage.getItem(localkey))
        setData(apiData)
        console.log("fetched from cache today")
        return
      }

      localStorage.clear()
      
      try{
          const res = await fetch(url)
          const apiData = await res.json()
          localStorage.setItem(localkey, JSON.stringify(apiData))
          setData(apiData)
          console.log("fetched from API today")
      }catch(err){
        console.log(err.message)
      }
    }

    fetchAPIData()
  }, [])


  return (
    <>
      {data ? (<Main data = {data} />): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      
      {showModal && (<SideBar handleToggleModal = {handleToggleModal} data={data} />)}

      {data && (<Footer handleToggleModal = {handleToggleModal} data={data} />)}
    </>
  )
}

export default App
