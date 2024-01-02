import User from "../models/User";
import Wallet from "../models/Wallet";

class UsersRepositories {
  async getAllUsers() {
    return await User.findAll({
      include: [
        {
          model: Wallet,
          attributes: ["id", "money"],
        },
      ],
    });
  }

  async getUserById(userId) {
    return await User.findByPk(userId, {
      include: [
        {
          model: Wallet,
          attributes: ["id", "money"],
        },
      ],
    });
  }

  async registerNewUser(body) {
    const newUser = await User.create(body);
    await Wallet.create({ user_id: newUser.id });

    return newUser;
  }
}

export default new UsersRepositories();
