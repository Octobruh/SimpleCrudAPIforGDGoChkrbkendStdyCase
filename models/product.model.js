const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please enter book title"],
		},
		
		author: {
			type: String,
			required: [true, "Please book author"],
		},
		
		published_at: {
			type: String,
			required: [true, "Please when it was published"],
		},	
	},
	{
		timestamps: true
	}
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;