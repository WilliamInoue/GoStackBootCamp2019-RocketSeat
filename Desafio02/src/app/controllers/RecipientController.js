import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    if (!recipients) {
      return res.status(400).json({ error: 'Database is Empty' });
    }

    return res.json(recipients);
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(400).json({ error: 'ID not Found' });
    }
    return res.json(recipient);
  }

  async showname(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Requiriment does not match' });
    }

    const recipient = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Client not Found' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .length(2)
        .required(),
      zip: Yup.string()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Requiriments does not match' });
    }

    const nameExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (nameExists) {
      return res.status(400).json({ error: 'Client name already exists.' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      district,
      city,
      state,
      zip,
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'ID not Found' });
    }

    Recipient.destroy({
      where: { id: req.params.id },
    });

    return res.json(`Client record ${recipient.name} deleted`);
  }

  async deleteName(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Requiriment does not match' });
    }

    const recipient = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Client not Found' });
    }

    Recipient.destroy({
      where: { name: recipient.name },
    });

    return res.json(`Client record ${recipient.name} deleted`);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .length(2)
        .required(),
      zip: Yup.string()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Requiriments does not Match' });
    }

    const recipient = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Client not Found' });
    }

    recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
