const authScret = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res)=>{
        const body = req.body
        if (!body.email || !body.password){
            return res.status(400).send('Dados incompletos')
        }
        const user = await app.db('users').where({email: body.email}).first()        
        if(user){
            bcrypt.compare(body.password.toString(), user.password.toString(), (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send('A senha informada é inválida!')
                }
                const payload = { 
                    id: user.id,
                    name: user.name,
                    email: user.email 
                }               
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authScret.secret)
                })
            })
        }else{
            res.status(400).send('Usuário não encontrado!')
        }
    }
    return {signin}
}