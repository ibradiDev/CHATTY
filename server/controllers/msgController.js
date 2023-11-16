const msgModel = require("../models/msgModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await msgModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });

        if (data) return res.json({ msg: "Message ajouté avec succès" });
        return res.json({ msg: "Echec lors de l'ajout du message" });

    } catch (err) {
        next(err);
    }
}

module.exports.getAllMessages = async (req, res, next) => {
    const { from, to } = req.body;
    const messages = await msgModel.find({
        users: {
            $all: [from, to],
        }
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
        return { fromSelf: msg.message.toString() === from, message: msg.message.text };
    });

    res.json(projectMessages)
}