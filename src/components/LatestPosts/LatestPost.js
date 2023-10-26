import  ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { useSession } from "../../middlewares/LineaProtetta";
import './latest.css'

const isAuth = () => {
  return JSON.parse(localStorage.getItem('utenteLoggato')) //prendo token dal localStorage
}


const LatestPosts = () => {
    const [currentPages, setCurrentPages] = useState(1);
    const [post, setPost] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    console.log("post", post);

    const session = useSession()
    console.log(session);
    

    const getPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/posts?page=${currentPages}`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : isAuth()

              }
            } ) /* per importare variabile d'ambiente*/
            setPost(response.data.posts)
            setCurrentPages(response.data.currentPage)
            setTotalPages(response.data.totalPages)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost();
    }, [currentPages])

    const onChange = (value) => {
        setCurrentPages(value)
    }

    
    const deletePost = async (postId) => {
      try {
        return await fetch (`${process.env.REACT_APP_URL}/posts/delete/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        
      } catch (error) {
        console.log(error);
      }
    }

    


    return (
        <div>
        <div className="bg-white py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-violet-800 sm:text-4xl">POST </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-violet-800 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {post && post?.map((post) => (
                <article key={nanoid()} className="flex max-w-xl flex-col items-start justify-between border-2 border-violet-800 bg-violet-800">
                  <div className="flex items-center gap-x-4 text-xs">
                    
                    <p className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white ">
                      {post.title}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img src={post.imgcover} alt="" className="imgLatest" />
                    
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                        <p className="px-3">{post.category}</p>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-white px-3">{post.description}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-white px-3">RATE: {post.rate}</p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-white px-3">Postato da {post.author.firstName} {post.author.lastName}</p>
                  </div>
                  <button className="mt-3 mx-3 bg-blue-600 p-2 rounded text-white" onClick={() => deletePost(post._id)}>
                    Cancella
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
  

        {totalPages && (
            <ResponsivePagination 
            current={currentPages}
            total={totalPages}
            onPageChange={onChange}
            />)}
    </div>

)
}
export default LatestPosts