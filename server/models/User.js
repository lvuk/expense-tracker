import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 2,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
