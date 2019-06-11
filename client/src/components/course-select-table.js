import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/course-select-table.css';
import axios from 'axios';
import { Container, Row, Col, Card, CardColumns} from 'react-bootstrap';

class CourseSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courseList: JSON.parse(localStorage.getItem('courseList')) || [],
			timestamp: localStorage.getItem('courseListTimestamp') || null,
			error: null
		}
	}

	async componentWillMount() {
		axios.get("/course/getCourseList")
			.then(res => {
				if (res.data.success) {
					if (res.status == 304) {
						var courses = JSON.parse(localStorage.getItem('courseList'));
						this.setState({ courseList: courses });
					} else {
						this.setState({ courseList: res.data.data.courseList });
						localStorage.setItem('courseListTimestamp', res.data.data.timestamp);
						localStorage.setItem('courseList', JSON.stringify(res.data.data.courseList));
					}

				} else
					this.setState({ error: res.data.message })
			});
	}

	render() {
		var courses = this.state.courseList.map(value => {
			return (
			// <div className="courses" key={value.code} onClick={() => this.props.selectCourse(value.code)}>
			// 	<div class="container-left">
			// 		<h1 className="course-title">{value.title}</h1>
			// 	</div>
			// 	<div class="container-right">
			// 		<ul>
			// 			<li className="course-code">{value.code}</li>
			// 			<li className="credits">{value.credits}</li>
			// 		</ul>
			// 	</div>
			// </div>

			<div className="courses" key={value.code} onClick={() => this.props.selectCourse(value.code)}>
				<CardColumns className="courseList">
					<Card className="courseCard">
						<Card.Body>
							<Card.Title>{value.title}</Card.Title>
							<Card.Text>{value.code} <div className="courseCredits">{value.credits} Credits</div>
							</Card.Text>
						</Card.Body>
					</Card>
				</CardColumns>
			</div>
			)
		})

		return (
			<div className="scrollHide">
				<div className="courseTable">
					
						<Card className="cardOne">
							<Card.Header className="cardOneHeader">
								<div className="courseTitle">Course Title</div>
								<div className="courseCode">Course Code</div>
								<div className="courseCredits">Total Credits</div>
							</Card.Header>
						</Card>
					{/* <div className="container-left">
						<h1 className="title-head">Course Title</h1>
					</div><div className="container-right-head">
						<ul>
							<li className="code-head">Code</li>
							<li className="credits-head">Credits</li>
						</ul>
					</div>
				</div> */}
				{courses}
				</div>
			</div>
		);
	}
}




export default CourseSelect;




