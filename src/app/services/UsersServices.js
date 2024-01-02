import UsersRepositories from "../repositories/UsersRepositories";

class UsersServices {
  async getAllUsers() {
    const data = await UsersRepositories.getAllUsers();

    if (!data) {
      throw { status: 500, message: "No data found" };
    }

    return data;
  }

  async getUserById() {
    const user = UsersRepositories.getUserById(userId);

    if (!user) {
      throw { status: 500, message: "No user found" };
    }
  }

  async registerNewUser(body) {
    return await UsersRepositories.registerNewUser(body);
  }
}
export default new UsersServices();
