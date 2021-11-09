import {IUserRepository} from "./IUserRepository";
import {User} from "../../models/User";
import {IUserDao} from "../daos/IUserDao";
import UserDao from "../daos/UserDao"

export class UserRepository implements IUserRepository {

    private static _instance : UserRepository;

    private userDao: IUserDao = UserDao.getInstance();

    private constructor() {}

    public static getInstance(): UserRepository {
        if (this._instance == null) {
            this._instance = new UserRepository();
        }
        return this._instance;
    }

    async createUser(user: User): Promise<boolean> {
        return await this.userDao.createUser(user);
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.userDao.deleteUser(id);
    }

    async getUserById(userId: string): Promise<User> {
        return await this.userDao.getUserById(userId);
    }

    async getUsers(): Promise<User[]> {
        return await this.userDao.getUsers();
    }

    async updateUser(id: string, newUser: User): Promise<User> {
        return await this.userDao.updateUser(id,newUser);
    }
}