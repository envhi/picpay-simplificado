import User from "../models/User";

class SessionsRepositories {
  async findUserByEmail(email) {
    return await User.findOne({
      where: { email: email },
    });
  }
}
export default new SessionsRepositories();
