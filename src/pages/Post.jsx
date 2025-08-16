import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button2, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button"
import ThreeScene from '../components/Box/chatCube' 

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-left mb-auto relative ">
                    {/* <img
                        // src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    /> */}



                    {isAuthor && (
                        <div className="flex right-auto top-auto">
                            <br />
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button2  className="mr-3 bg-blue-500 hover:bg-stone-800">
                                    Edit
                                </Button2>
                            </Link>
                            <Button2 className=" mr-3 bg-red-500 hover:bg-stone-800" onClick={deletePost} >
                                Delete
                            </Button2>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                 <div className='flex flex-wrap'>
                <div className="browser-css">
                  
                    {parse(post.content)}
                    </div>
                     <ThreeScene />
                     </div>
            </Container>
            
        </div>
    ) : null;
}
