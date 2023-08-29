const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel');

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173'], 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);
app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json('The Token is missing');
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json('The token is Wrong');
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ username, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err));
        })
        .catch(err => console.log(err));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign(
                            { email: user.email, username: user.username },
                            'jwt-secret-key',
                            { expiresIn: '1d' }
                        );
                        res.cookie('token', token);
                        return res.json('Success');
                    } else {
                        return res.json('Password Incorrect');
                    }
                });
            } else {
                res.json('User Does Not Exist');
            }
        });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
});

app.use('/images', express.static(path.join(__dirname, 'public/Images')));

app.get('/getposts', (req, res) => {
    PostModel.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post('/create', verifyUser, upload.single('file'), (req, res) => {
    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

app.delete('/deletepost/:postId', verifyUser, async (req, res) => {
    try {
        const postId = req.params.postId;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.file) {
            const imagePath = path.join(__dirname, 'public/Images', post.file);
            fs.unlinkSync(imagePath);
        }

        await post.remove();
        return res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json('Success');
});

app.listen(3001, () => {
    console.log('Server is Running');
});






