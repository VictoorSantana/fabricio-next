import jwt from "jsonwebtoken";

export const NeedAuth = (req) => {
    return new Promise((resolve) => {


        const authorization = req.headers.get("authorization")

        if (!authorization) {
            resolve({ errorAuth: `Header authorization não foi encontrado` });
        }

        const bearerToken = authorization.split(' ')[1];

        if (!bearerToken) {
            resolve({ errorAuth: `Bearer token não foi encontrado` });
        }

        jwt.verify(bearerToken, String(process.env.SERVER_KEY), async (err, decoded) => {
            if (err || !decoded) {
                resolve({ errorAuth: 'Você precisa autenticar antes de usar essa função.' });
                return;
            }

            resolve({ user: decoded });
        });
    })
}



export const Validate = (body, schema) => {
    if (schema) {
        const result = schema.safeParse(body);
        const firstErrorMessage = result?.error?.issues[0]?.message;
        if (!result.success) {
            return `Campo ${result?.error?.issues[0].path[0]}: ${firstErrorMessage}` // Erros detalhados                
        }
    }
    return null;
}
