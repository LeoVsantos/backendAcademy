import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            idade: Yup.number()
                .integer()
                .required(),
            peso: Yup.number()
                .truncate()
                .required(),
            altura: Yup.number()
                .truncate()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const StudentsExists = await Students.findOne({
            where: { email: req.body.email },
        });
        if (StudentsExists) {
            return res.status(400).json({ error: 'Student already exists.' });
        }

        const { id, name, email, idade, peso, altura } = await Students.create(
            req.body
        );

        return res.json({ id, name, email, idade, peso, altura });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            idade: Yup.number()
                .integer()
                .required(),
            peso: Yup.number()
                .truncate()
                .required(),
            altura: Yup.number()
                .truncate()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const { id } = req.body;

        const students = await Students.findByPk(id);

        const Update = await students.update(req.body);

        return res.json(Update);
    }
}

export default new StudentsController();
