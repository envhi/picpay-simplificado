import * as Yup from "yup";

class yupValidation {
  async userRegisterSchema(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cpfcnpj: Yup.string().required(),
      password: Yup.string().required().min(8),
      passwordConfirmation: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ msg: "caiu no yup" });
    }

    return next();
  }

  async sessionsSchema(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ msg: "caiu no yup" });
    }

    return next();
  }

  async transactionSchema(req, res, next) {
    /*
                  {
                    "value": 100.0,
                    "payer": 4,
                    "payee": 15
                  }
    */
    const schema = Yup.object().shape({
      value: Yup.string().required(),
      payee: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ msg: "caiu no yup" });
    }

    return next();
  }
}

export default new yupValidation();
