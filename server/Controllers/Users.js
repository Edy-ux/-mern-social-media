import User from '../Models/User';

/* READ */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserFollows = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath, location, occupation }) => {
        return {
          _id,
          firstName,
          lastName,
          email,
          password,
          picturePath,
          location,
          occupation,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* MUTATION */
const addRemoveFollow = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends((id) => id !== friendId);
      friend.friends = friend.friends((id) => id !== id);
      res.status(200).json({ message: 'Friend Removed' });
    } else {
      user.friends.push(friendId);
      friends.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, picturePath, location }) => {
        return {
          _id,
          firstName,
          lastName,
          email,
          password,
          picturePath,
          location,
          occupation,
        };
      }
    );
    res.status(200).send(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export { getUser, addRemoveFollow, getUserFollows };
