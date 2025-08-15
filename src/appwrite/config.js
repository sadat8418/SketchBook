import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
//create
    async createPost({title, slug, content, status, userId}){ //featuredImage 
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  //DOCUMENT_ID , id.unique or slug value 
                {  //object
                    title,
                    content,
                    // featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
//update
    async updatePost(slug, {title, content, status}){ //featuredImage cilo
        try { //slug thke document_ID pabo
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,  //Database_ID
                conf.appwriteCollectionId, //collection_ID 
                slug,  // DOoCUMENT_ID
                {
                    title,
                    content,
                    // featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }
//ekta document nibo
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
// all post jader status=actuve  (index banalei only query kaj korbe )
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                //100 , pagaination o ace 

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){ // actual file dite hoy, only name dile hoy na 
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
//preview 
    // getFilePreview(fileId){
    //   try {
    //       return  this.bucket.getFilePreview(
    //           conf.appwriteBucketId,
    //           fileId
    //       )
    //   } catch (error) {
    //     console.log("Appwrite serive :: getFilePreviw :: error", error);
    //         return false
    //   }
    // }
}


const service = new Service()
export default service