const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_PROVIDER,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
    }
});

module.exports = {
    async send(req,res){
        const {name,email,message} = req.body;

        const mailOptions = {
            from: process.env.EMAIL_AUTH_USER,
            to: process.env.EMAIL_AUTH_USER,
            subject: 'Você recebeu uma nova mensagem!',
            text: `Você recebeu uma mensagem de ${name}.\n"${message}".\nPara responder, envie um e-mail para ${email}`
        };

        let response, status;

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                response = `Ops! Houve uma falha no envio.\tPor favor ${name} tente novamente mais tarde.`;
                status = 400;
                return res.status(status).json({message:response});
            }
            
            else {
               response = `Feito! Fique atento a sua caixa de e-mails ${name}\tpois em breve retornarei o contato.`;
               status = 200;
               return res.status(status).json({message:response});
            }
        });
    }
}