import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import user from '../utility/userUtility';


const router = express.Router();

router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));

router.get('/getSelectedCourses', async (req, res, next) => {
	try {
		var userData = await user.findUserByID(req.user._id);

		if(!userData)
			res.status(404).json({ success: false, message: 'User not found' });

		var data = userData.selected_courses;
		res.json({ success: true, data: data });
	} catch (err) {
		res.status(500).json({ success: false, message: '/getSelectedCourses failed' });
		console.log(err);
	}
});

router.post('/updateSelectedCoursesBulk', async (req, res, next) => {
	try {
		var queryData = { _id: req.user.id }
		var updateData = { selected_courses: req.body.selected_courses };

		var data = await user.updateUser(queryData, updateData);
		res.json({ success: true, data: data });
	} catch (err) {
		res.status(500).json({ success: false, message: '/updateSelectedCoursesBulk failed' });
		console.log(err);
	}
});

router.post('/selectCourse', async (req, res, next) => {
	
});

router.post('/setSelectedCurriculum', async (req, res, next) => {
	try {
		var queryData = { _id: req.user.id };
		var updateData = { selected_curriculum: req.body.selected_curriculum };

		var data = await user.updateUser(queryData, updateData);
		res.json({ success: true, data: data });
	} catch (err) {
		res.status(500).json({ success: false, message: '/setSelectedCurriculum failed' });
		console.log(err);
	}
});



module.exports = router;