    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true } // hashed password
    }, { timestamps: true }); // track createdAt, updatedAt

    const tagSchema = new mongoose.Schema({
        title: { type: String, required: true, unique: true }
    }, { timestamps: true });

    const contentSchema = new mongoose.Schema({
        title: { type: String, required: true },
        link: { type: String },
        type: { type: String },
        description: { type: String, default: "" },
        tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }], // Many-to-Many
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true } // Many contents to 1 user
    }, { timestamps: true });

    const linkSchema = new mongoose.Schema({
        hash: { type: String, required: true },
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true } // 1 link per user
    }, { timestamps: true });

    export const Tag = mongoose.model('Tag', tagSchema);
    export const userModel = mongoose.model('User', userSchema);
    export const contentModel = mongoose.model('Content', contentSchema);
    export const linkModel = mongoose.model('Link', linkSchema);
