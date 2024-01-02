import UsersServices from "../services/UsersServices";
// fazer camada repositorio
// camada service vai se a regra de negocio
// repositories icomunicaçao com o banco
class Users {
  async getAllUsers(req, res) {
    try {
      const data = await UsersServices.getAllUsers();

      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async registerNewUser(req, res) {
    try {
      const newUser = await UsersServices.registerNewUser(req.body);

      res.status(200).json({ newUser });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new Users();
