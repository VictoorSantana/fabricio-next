

class RecaptchaService {
    constructor() { }

    static test(clientToken) {
        return new Promise((resolve, reject) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: "{}",
                redirect: "follow"
            };

            fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CLIENT_RECAPTCHA}&response=${clientToken}`, requestOptions)
                .then((response) => response.text())
                .then((result) => resolve(JSON.parse(result)))
                .catch((error) => reject(error));
        })

    }
}

module.exports = {
    RecaptchaService
}

