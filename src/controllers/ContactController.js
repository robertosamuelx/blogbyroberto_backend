module.exports = {
    send(req,res){
        return res.status(200).json({message:"Done!"});
    }
}