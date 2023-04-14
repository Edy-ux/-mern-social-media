import User from "../models/User";


const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        delete user.password
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getUserFriends = async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        )

        const friendsFormatted = friends.map(({ _id, firstName, lastName, picturePath, location, occupation }) => ({
            _id,
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation,
        }))
        res.status(200).json(friendsFormatted)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


