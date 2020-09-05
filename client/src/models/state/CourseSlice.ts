import HeatmapCourse from '../data/HeatmapCourse';
import {
	CourseList,
	CourseSlotList,
	CourseFacultyList,
	CourseTypeList,
} from '../data/CourseLists';
import RequisitesList from '../data/RequisitesList';

export default interface CourseSlice {
	selected: string,
	heatmap: {
		timestamp : string | null,
		data: Array<HeatmapCourse>,
	},
	lists: {
		course: CourseList,
		faculty: CourseFacultyList,
		slot: CourseSlotList,
		type: CourseTypeList,
		req: RequisitesList,
	},
}
