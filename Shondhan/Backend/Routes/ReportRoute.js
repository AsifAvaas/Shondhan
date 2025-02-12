const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Report = require('../model/ReportModel')
const User = require('../Model/UserModel')
const Comment = require('../Model/CommentModel')
// const cloudinary = require('../utils/cloudinary')
// const upload = require('../middleware/multer')




router.get('/reports/all',async (req, res) => {
    try {
        const reports = await Report.find()
            .select('reportTitle reportDescription reportPic reportVideo reportDivision reportDistrict authorId likeCount dislikeCount crimeTime reportVarified')
            .populate('authorId', 'userName')

        
            return res.status(201).json({
                success: true,
                reports,
                
            });
        
       
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/reports/myreports', async (req, res) => {
    try {
        

        const {userId}= req.query
       
        const reports = await Report.find({ authorId: userId })
            .select('reportTitle reportDescription reportPic reportVideo reportDivision reportDistrict authorId likeCount dislikeCount crimeTime reportVarified')
            .populate('authorId', 'name')
           


            return res.status(201).json({
                success: true,
                reports :reports,
                userId: userId,
                message:"hello"
                
            });
      
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});


router.get('/reports/:id', async (req, res) => {
    try {
        const { userId } = req.query;

        const report = await Report.findById(req.params.id)
        if (!report) {
            return res.status(400).json({ success: false, message: "No blogs found" })
        }
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const isLiked = report.likers.some(likerId => likerId.equals(userObjectId));
        const isDisliked = report.dislikers.some(dislikerId => dislikerId.equals(userObjectId));

        return res.status(201).json({
            success: true, report, isLiked,
            isDisliked
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
    }
})

router.post('/reports/create', async (req, res) => {
    const {
        reportTitle,reportPic ,reportVideo ,reportDescription,reportDivision,
        reportDistrict,authorId ,crimeTime} = req.body


    try {
        const author = await User.findById(authorId)
        if (!author) {
            return res.status(400).json({ success: false, message: "No user found" })
        }
        
        const newReport = new Report({
            reportTitle,reportPic ,reportVideo ,reportDescription,reportDivision,
        reportDistrict,authorId ,crimeTime
        })
        
        await newReport.save();

        return res.status(201).json({ success: true, message: "Report created successfully" })


    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

})

router.put('/reports/update',async (req, res) => {
    const {
        reportId, reportTitle,reportPic ,reportVideo ,reportDescription,reportDivision,
        reportDistrict,authorId ,crimeTime} = req.body

   try{
        // Find the existing blog to get the current image URL if no new image is uploaded
        const existingReport = await Report.findById(reportId);

        if (!existingReport) {
            return res.status(400).json({ success: false, message: "Blog not found" });
        }



        // Update the blog
        const report = await Report.findByIdAndUpdate(reportId, {
            reportTitle,reportPic ,reportVideo ,reportDescription,reportDivision,
        reportDistrict,authorId ,crimeTime
        }, { new: true });

        return res.status(201).json({ success: true, report });
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(400).json({ success: false, message: "An error occurred while updating the blog" });
    }
});

router.delete('/reports/delete', async (req, res) => {
    const { reportId } = req.body
    try {
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(400).json({ success: false, message: "Blog not found" });
        }
        await Report.findByIdAndDelete(report)
        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "An error occurred while deleting the blog" });
    }
})

router.post('/reports/comment', async (req, res) => {
    const { commenterId, commentBody,commentPic, reportId } = req.body
    try {
        const user = await User.findById(commenterId)
        if (!user) {
            return res.status(400).json({ success: false, message: "No user found" })
        }
        const report = await Report.findById(reportId)

        if (!report) {
            return res.status(400).json({ success: false, message: "No blog found" })
        }
        const newComment = new Comment({
            commenterId,
            commentBody,
            commentPic,
            reportId
        });

        await newComment.save()
        




        return res.status(201).json({ success: true, message:"comment made successfully" })


    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
})

router.get('/comment',async(req,res)=>{
    try {
        const {reportId}=req.query

        if (!reportId) {
            return res.status(400).json({ success: false, message: "reportId is required" });
        }
        const comments= await Comment.find({reportId})
        return res.status(201).json({success:true, comments})
    } catch (error) {
        
    }
})

router.put('/reports/comment/update', async (req, res) => {
    const {commentId, commenterId, commentBody,commentPic, reportId} = req.body
    try {
        const report = await Report.findById(reportId)
        if (!report) {
            return res.status(400).json({ success: false, message: "No blog found" })
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({ success: false, message: "No comment found" });
        }

        if (comment.commenterId.toString() !== commenterId) {
            return res.status(400).json({ success: false, message: "Unauthorized to update this comment" });
        }

        comment.commentBody = commentBody || comment.commentBody;
        comment.commentPic = commentPic || comment.commentPic;

        await comment.save();


        return res.status(201).json({
            success: true,
            message: "Comment updated successfully",
            });


    } catch (error) {
        return res.status(400).json({ success: false, message: error.message})
    }
})



router.delete('/reports/comment/delete', async (req, res) => {
    const { commenterId, commentId } = req.body
    try {

        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(400).json({ success: false, message: "No coment found" })
        }
       
        if (comment.commenterId.toString() !== commenterId) {
            return res.status(400).json({ success: false, message: "Commenter doesn't match" });
        }
        await Comment.findByIdAndDelete(commentId)
        return res.status(200).json({ success: true })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
    }

})


router.post('/reports/impression/:data', async (req, res) => {
    try {
        const { data } = req.params;
        const { reportId, userId } = req.body;

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the report by ID
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ success: false, message: "No report found" });
        }

        if (data === 'like') {
            const isLiked = report.likers.some(likerId => likerId.equals(userObjectId));

            if (isLiked) {
                // Remove like
                report.likers.pull(userObjectId);
                report.likeCount--;
            } else {
                // Add like
                report.likers.push(userObjectId);
                report.likeCount++;

                // Remove from dislikers if already disliked
                const isDisliked = report.dislikers.some(dislikerId => dislikerId.equals(userObjectId));
                if (isDisliked) {
                    report.dislikers.pull(userObjectId);
                    report.dislikeCount--;
                }
            }
        } else if (data === 'dislike') {
            const isDisliked = report.dislikers.some(dislikerId => dislikerId.equals(userObjectId));

            if (isDisliked) {
                // Remove dislike
                report.dislikers.pull(userObjectId);
                report.dislikeCount--;
            } else {
                // Add dislike
                report.dislikers.push(userObjectId);
                report.dislikeCount++;

                // Remove from likers if already liked
                const isLiked = report.likers.some(likerId => likerId.equals(userObjectId));
                if (isLiked) {
                    report.likers.pull(userObjectId);
                    report.likeCount--;
                }
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid action. Use 'like' or 'dislike'." });
        }

        // Save updated report
        await report.save();

        return res.status(201).json({
            success: true,
            message: `Report ${data}d successfully`,
            report,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});


module.exports = router