import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
// eitai main connection ,  backend er sathe frontend connect


// appwrite a account.create() e sob manually dite hoy (default ta use korle)
// UI & business logic 2tai inject kora valo na ...
export class AuthService {
    client = new Client();
    account; // new keyword diye banale setEndpoint, setProject dite hobe  

    constructor() {  // (account) object banale tokhon client toiri hobe , class a bydefault dile resource waste hobe 
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    //account toiri , createAccount easy in appwrite but we have created a uiversal method
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name); //unique user id must
            if (userAccount) {
                // call another method (login o kore dicci) login method niche
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions(); // appwrite methods
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService(); //object creation new keyword diye

export default authService


