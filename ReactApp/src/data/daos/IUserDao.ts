import {User} from "../../models/User";

export interface IUserDao {
    createUser(user: User): Promise<boolean>
    getUsers(): Promise<User[]>
    getUserById(userId: string): Promise<User>
    updateUser(id: string, newUser: User): Promise<User>
    deleteUser(id: string): Promise<boolean>
}