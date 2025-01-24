export const validation = (schema) => {
    return (req, res, next) => {
        const errorsMessage = [];
        const { error } = schema.validate(
            { ...req.body, ...req.params, ...req.query },
            { abortEarly: false }
        );

        if (error) {
            error.details.forEach(err => {
                const key = err.context.key;
                errorsMessage.push({ [key]: err.message });
            });
            return res.status(400).json({ message: "validation error", errors: errorsMessage });
        }

        next();
    };
};
