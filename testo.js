const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/product.model.js');

const app = express();

app.use(express.json());

//console.log("hello world, this is my very first API written in JS");

app.get('/', (req, res) => {
	res.send("Hellow World, from my first Node API. Excelatho! Latho Latho");
});

//C for Create
app.post('/api/books', async (req, res) => {
    try {
        const { title, author, published_at } = req.body;
        const book = Book({ title, author, published_at });

        const savedBook = await book.save();

        res.status(201).json({
            message: "Book created successfully",
            data: {
                title: savedBook.title,
                author: savedBook.author,
                published_at: savedBook.published_at,
                updated_at: savedBook.updatedAt,
                created_at: savedBook.createdAt,
                id: savedBook._id // Convert _id to id
            }
        });
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
});

//R for Read but for individual items
app.get('/api/books/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const books = await Book.findById(id);
		if (!books) {
			return res.status(404).json({message: "Book ain't here bruh"});
		}
		res.status(201).json(books);
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
});

//R for Read
app.get('/api/books', async (req, res) => {
	try {
		const books = await Book.find({});
		if (!books) {
			return res.status(404).json({message: "Book ain't here bruh"});
		}
		res.status(201).json(books);
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
});

//U for Update
app.put('/api/books/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const books = await Book.findByIdAndUpdate(id, req.body);
		
		if (!books) {
			return res.status(404).json({message: "Book ain't here bruh"});
		}
		
		const updatedBook = await Book.findById(id);
        res.status(200).json({
            message: "Book updated successfully",
            data: {
                title: updatedBook.title,
                author: updatedBook.author,
                published_at: updatedBook.published_at,
                updated_at: updatedBook.updatedAt,
                created_at: updatedBook.createdAt,
                id: updatedBook._id
            }
        });
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
});

//D for Destroy
app.delete('/api/books/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const books = await Book.findByIdAndDelete(id);
		
		if (!books) {
			return res.status(404).json({message: "Book ain't here bruh"});
		}
		
		res.status(200).json({message: "Book deleted successfully"});
	}
	catch (error) {
		res.status(500).json({message: error.message});
	}
});

//for database
mongoose.connect("mongodb+srv://MAthallahY:nOgg0M7TH0x6Ng20@cluster0formyfirstapi.syvza.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0formyFirstAPI")
.then(() => {
	console.log("Connected to database");
	app.listen(3000, () => {
		console.log('Server is running on port 3000, hello btw')
	});
})
.catch(() => {
	console.log("Ain't no connection bruh");
});
