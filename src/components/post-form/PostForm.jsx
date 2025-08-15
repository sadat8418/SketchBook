import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button2, Input, RTE, Select } from ".."; //Button cilo 
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button"
import ThreeScene from '../Box/chatCube' 
//continuosly watch 

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: { //jodi edit korte ase, default value dite hoy
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
//user form sumbit korle data thakbe 
    const submit = async (data) => {
        if (post) {
            // const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
// upload hoice , puraton delete
            // if (file) {
            //     appwriteService.deleteFile(post.featuredImage);
            // }
//update post
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                // featuredImage: file ? file.$id : undefined, // overwrite only image
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else { // user new form vreate korte chacce, update korar kisu nai // TODO : improve korle valo , file thakle upload , DONE
            // const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]):1;

            // if (file) {
                // const fileId = file.$id;
                // data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            // }
        }
    };
    //  "slug" refers to a human-readable, SEO-friendly part of a URL  (naming every post-url)
//important for interview , slugTransform , watch title and generate slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => { //memory management by storing in variable
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
           {/* w-2/3 2/3 part ekta form  */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
             <div className="w-1/3 px-2">
                {/* <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })} // !post cilo
                />  */}
                {/* {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />

                    </div> 
                )} */}
                <br />
                <div> Status: </div>
                <Select
                    label="Status :"
                    options={["active", "inactive"]}
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {/* className='inline-bock px-9 py-2 duration-200 hover:text-green-300 rounded-full'
                mr-3 bg-blue-500
                */}
                <Button2 type="submit" bgColor={post ? "mr-3 bg-green-500 hover:bg-green-800" : undefined} className="mr-3 bg-blue-500 hover:bg-blue-800">
                    {post ? "Update" : "Submit"}
                </Button2>

                  
            </div>
             <ThreeScene />
        </form>
    );
}
