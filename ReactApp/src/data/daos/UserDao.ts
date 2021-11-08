import {IUserDao} from "./IUserDao";
import {User} from "../../models/User";

export class UserDao implements IUserDao{
    createUser(user: User): Promise<boolean> {
        return Promise.resolve(false);
    }

    deleteUser(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    getUserById(userId: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    getUsers(): Promise<User[]> {
        return Promise.resolve([]);
    }

    updateUser(id: string, newUser: User): Promise<User> {
        return Promise.resolve(undefined);
    }

}