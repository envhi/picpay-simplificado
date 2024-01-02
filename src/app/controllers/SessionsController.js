import SessionsServices from "../services/SessionsServices";

class SessionsController {
  async createSession(req, res) {
    try {
      const token = await SessionsServices.createSession(
        req.body.email,
        req.body.password
      );
      return res.status(200).json({ msg: "Autenticado", token });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new SessionsController();
