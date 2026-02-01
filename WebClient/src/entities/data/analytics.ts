export interface CourseAnalytics {
  course_id: number;
  views: number;
  enrollments: number;
  completions: number;
  avg_progress: number;
  avg_rating: number;
  updated_at: string;
}

export interface LessonAnalytics {
  lesson_id: number;
  views: number;
  starts: number;
  completions: number;
  avg_time_spent: number;
  drop_rate: number;
  updated_at: string;
}

export interface TeacherAnalytics {
  teacher_id: number;
  total_students: number;
  total_courses: number;
  total_revenue: number;
  avg_course_rating: number;
  updated_at: string;
}
