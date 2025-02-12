const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Report = require('../model/ReportModel')
const User = require('../Model/UserModel')
// const cloudinary = require('../utils/cloudinary')
// const upload = require('../middleware/multer')




router.get('/reports/all',async (req, res) => {
    try {
        const reports = await Report.find()
            .select('reportTitle reportDescription reportPic reportVideo reportDivision reportDistrict authorId likeCount dislikeCount crimeTime reportVarified')
            .populate('authorId', 'name')

        
            return res.status(201).json({
                success: true,
                reports,
                
            });
        
       
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/blogs/myblogs', async (req, res) => {
    try {
        const { page = 1, limit = 5, userId } = req.query; // Accept userId from the query params

        // Fetch total count of blogs for the specific user
        const totalBlogs = await Blogs.countDocuments({ authorId: userId });

        // Fetch paginated blogs for the specific user
        const blogs = await Blogs.find({ authorId: userId })
            .select('blogName blogBody blogPicture authorName likeCount dislikeCount')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        if (blogs.length > 0) {
            return res.status(200).json({
                success: true,
                blogs,
                totalBlogs // Include total blog count
            });
        }
        return res.status(404).json({ success: false, error: "No more blogs available" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


router.get('/blogs/:id', async (req, res) => {
    try {
        const { userId } = req.query;

        const blog = await Blogs.findById(req.params.id)
        if (!blog) {
            return res.json({ success: false, error: "No blogs found" })
        }
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const isLiked = blog.likers.some(likerId => likerId.equals(userObjectId));
        const isDisliked = blog.dislikers.some(dislikerId => dislikerId.equals(userObjectId));

        return res.json({
            success: true, blog: blog, isLiked: isLiked,
            isDisliked: isDisliked
        })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, error: error })
    }
})

// router.post('/blogs/create', upload.single('image'), async (req, res) => {
//     const { blogName, authorId, blogBody } = req.body


//     try {
//         const author = await User.findById(authorId)
//         if (!author) {
//             return res.json({ success: false, error: "No user found" })
//         }
//         let blogPicture = null;
//         if (req.file) {
//             const result = await cloudinary.uploader.upload(req.file.path);
//             blogPicture = result.secure_url;
//         }
//         await new Blogs({
//             blogName,
//             blogPicture, // This will be null if no image is uploaded
//             blogBody,
//             authorId,
//             authorName: author.name,
//         }).save();
//         return res.status(200).json({ success: true, message: "Blog created successfully" })


//     } catch (error) {
//         return res.json({ success: false, error: error })
//     }

// })

// router.put('/blogs/update', upload.single('image'), async (req, res) => {
//     const { blogId, blogName, blogBody } = req.body;
//     let blogPicture;

//     try {
//         // If an image is provided, upload to Cloudinary
//         if (req.file) {
//             const result = await cloudinary.uploader.upload(req.file.path);
//             blogPicture = result.secure_url;
//         }

//         // Find the existing blog to get the current image URL if no new image is uploaded
//         const existingBlog = await Blogs.findById(blogId);

//         if (!existingBlog) {
//             return res.json({ success: false, message: "Blog not found" });
//         }

//         // If no new image is uploaded, keep the current blog picture
//         blogPicture = blogPicture || existingBlog.blogPicture;

//         // Update the blog
//         const blog = await Blogs.findByIdAndUpdate(blogId, {
//             blogName,
//             blogPicture,
//             blogBody,
//         }, { new: true });

//         return res.status(200).json({ success: true, blog });
//     } catch (error) {
//         console.error("Error updating blog:", error);
//         return res.status(500).json({ success: false, message: "An error occurred while updating the blog" });
//     }
// });

// router.delete('/blogs/delete', async (req, res) => {
//     const { blogId } = req.body
//     try {
//         const blog = await Blogs.findById(blogId);
//         if (!blog) {
//             return res.status(404).json({ success: false, message: "Blog not found" });
//         }
//         await Blogs.findByIdAndDelete(blogId)
//         return res.status(200).json({ success: true, message: "Blog deleted successfully" });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "An error occurred while deleting the blog" });
//     }
// })

// router.post('/blogs/comment', async (req, res) => {
//     const { commenterId, comment, blogId } = req.body
//     try {
//         const user = await User.findById(commenterId)
//         if (!user) {
//             return res.json({ success: false, error: "No user found" })
//         }
//         const blog = await Blogs.findById(blogId)

//         if (!blog) {
//             return res.json({ success: false, error: "No blog found" })
//         }
//         const newComment = {
//             commenterId,
//             commenterName: user.name,
//             commentText: comment,
//         };
//         blog.comments.push(newComment);

//         // Save the updated blog document
//         await blog.save();

//         return res.status(200).json({ success: true, blog })


//     } catch (error) {
//         return res.json({ success: false, error: error })
//     }
// })

// router.put('/blogs/comment/update', async (req, res) => {
//     const { newComment, userId, commentId, blogId } = req.body
//     try {
//         const blog = await Blogs.findById(blogId)
//         if (!blog) {
//             return res.json({ success: false, error: "No blog found" })
//         }
//         const comment = blog.comments.id(commentId);
//         if (!comment) {
//             return res.status(404).json({ success: false, error: "No comment found" });
//         }

//         if (comment.commenterId.toString() !== userId) {
//             return res.status(403).json({ success: false, error: "Commenter doesn't match" });
//         }

//         comment.commentText = newComment;
//         await blog.save();

//         return res.status(200).json({ success: true })


//     } catch (error) {
//         return res.json({ success: false, error: error })
//     }
// })
// router.delete('/blogs/comment/delete', async (req, res) => {
//     const { userId, commentId, blogId } = req.body
//     try {

//         const blog = await Blogs.findById(blogId)
//         if (!blog) {
//             return res.json({ success: false, error: "No blog found" })
//         }
//         const comment = blog.comments.id(commentId);
//         if (!comment) {
//             return res.status(404).json({ success: false, error: "No comment found" });
//         }
//         if (comment.commenterId.toString() !== userId) {
//             return res.status(403).json({ success: false, error: "Commenter doesn't match" });
//         }
//         blog.comments.pull(commentId);
//         await blog.save();
//         return res.status(200).json({ success: true })

//     } catch (error) {
//         console.log(error)
//         return res.json({ success: false, error: error })
//     }


// })

// router.post('/blog/impression/:data', async (req, res) => {
//     try {
//         const { data } = req.params;
//         const { blogId, userId } = req.body;

//         const blog = await Blogs.findById(blogId);
//         if (!blog) {
//             return res.json({ success: false, error: "No blog found" });
//         }

//         const userObjectId = new mongoose.Types.ObjectId(userId);

//         if (data === 'like') {
//             const isLiked = blog.likers.some(likerId => likerId.equals(userObjectId));

//             if (isLiked) {
//                 blog.likers.pull(userObjectId);
//                 blog.likeCount--;
//             } else {
//                 blog.likers.push(userObjectId);
//                 blog.likeCount++;


//                 const isDisliked = blog.dislikers.some(dislikerId => dislikerId.equals(userObjectId));
//                 if (isDisliked) {
//                     blog.dislikers.pull(userObjectId);
//                     blog.dislikeCount--;
//                 }
//             }
//         } else if (data === 'dislike') {
//             const isDisliked = blog.dislikers.some(dislikerId => dislikerId.equals(userObjectId));

//             if (isDisliked) {
//                 // Remove the userId from dislikers array
//                 blog.dislikers.pull(userObjectId);
//                 blog.dislikeCount--;
//             } else {
//                 // Add the userId to dislikers array
//                 blog.dislikers.push(userObjectId);
//                 blog.dislikeCount++;

//                 // Remove the userId from likers array if it's there
//                 const isLiked = blog.likers.some(likerId => likerId.equals(userObjectId));
//                 if (isLiked) {
//                     blog.likers.pull(userObjectId);
//                     blog.likeCount--;
//                 }
//             }
//         }

//         // Save the updated blog
//         await blog.save();

//         return res.json({
//             success: true,
//             message: `Blog ${data}d successfully`,
//             blog: blog,
//         });
//     } catch (error) {
//         return res.json({ success: false, error: error.message || error });
//     }

// })



module.exports = router