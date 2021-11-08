import {IUserDao} from "./IUserDao";
import {User} from "../../models/User";
import HttpClient from "../infrastructure/HttpClient";
import {Kvis} from "../../models/Kvis";

class UserDao implements IUserDao{

    private static _instance: UserDao

    private httpClient: HttpClient

    private constructor() {
        this.httpClient = new HttpClient();
    }

    public static getInstance(): UserDao{
        if (this._instance == null) {
            this._instance = new UserDao();
        }
        return this._instance;
    }


    async createUser(user: User): Promise<boolean> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_CREATE_USER
        return await this.httpClient.request({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            body: user
        })
    }

    async deleteUser(id: string): Promise<boolean> {
        //TODO: Implement me
        return Promise.resolve(false);
    }

    async getUserById(userId: string): Promise<User> {
        //TODO: Implement me
        return Promise.resolve(new User());
    }

    async getUsers(): Promise<User[]> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_GET_USERS
        return await this.httpClient.request({
            method: 'GET',
            url: url
        }).then(data => {
            return data as User[];
        });
    }

    async updateUser(id: string, newUser: User): Promise<User> {
        //TODO: Implement me
        return Promise.resolve(new User());
    }

}
export default UserDao