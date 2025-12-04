import postImg from "@assets/post/post.jpeg";
import avatar from "@assets/image/avatar.jpeg";
import courseImg1 from "@assets/course/courseImg1.jpeg";
import courseImg2 from "@assets/course/courseImg2.jpeg";
import courseImg3 from "@assets/course/courseImg3.jpeg";
import courseImg4 from "@assets/course/courseImg4.jpeg";
import { ListNews, type Post } from "@entities/data/post";
import avatarPlaceholder1 from "@assets/post/author1.jpeg";
import avatarPlaceholder2 from "@assets/post/author2.jpeg";
import type { User, UsersFinances } from "@entities/data/user";
import type { Subscriptions, Tariffs } from "@entities/data/subscriptions";
import { SubscriptionStatus, EnrollmentStatus } from "@entities/data/enums";
import type { Categories, Course, Enrollments } from "@entities/data/course";

// Users
export const mockUser: User = {
  user_id: 1,
  full_name: "Alexey Logbinov",
  email: "logbinov@none.com",
  login: "logbinov",
  avatar: avatar,
  is_verified: true,
  role_id: 4,
  uf_id: 1,
  created_at: "2024-02-15",
  updated_at: "2025-05-01",
};
export const mockRole = [
  {
    role_id: 1,
    role_name: "Administrator",
  },
  {
    role_id: 2,
    role_name: "Moderator",
  },
  {
    role_id: 3,
    role_name: "Teacher",
  },
  {
    role_id: 4,
    role_name: "Student",
  },
];
export const mockFinance: UsersFinances = {
  uf_id: 1,
  card_id: 1234,
  currency: "USD",
  balance: 1535.5,
  created_at: "2024-02-15",
  updated_at: "2025-05-01",
};
export const mockSubscription: Subscriptions = {
  sub_id: 1,
  user_id: 1,
  sub_item: 1,
  start_date: "01.01.2025",
  end_date: "31.12.2025",
  status: SubscriptionStatus.ACTIVE,
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};
export const mockEnrollments: Enrollments[] = [
  {
    enrollments_id: 1,
    user_id: 1,
    course_id: 1,
    progress: 100,
    status: EnrollmentStatus.COMPLETED,
    started_at: "01.02.2025",
    complected_at: "01.04.2025",
  },
  {
    enrollments_id: 2,
    user_id: 1,
    course_id: 2,
    progress: 100,
    status: EnrollmentStatus.COMPLETED,
    started_at: "2025-01-01",
    complected_at: "01.03.2025",
  },
  {
    enrollments_id: 3,
    user_id: 1,
    course_id: 3,
    progress: 0,
    status: EnrollmentStatus.ENROLLED,
    started_at: "2025-11-30",
    complected_at: "",
  },
];

// Marketplace
export const mockCategories: Categories[] = [
  {
    category_id: 1,
    category_name: "Programming",
    category_desc:
      "Courses related to software development, algorithms and coding.",
  },
  {
    category_id: 2,
    category_name: "Design",
    category_desc: "UI/UX, visual design, and graphic creation courses.",
  },
  {
    category_id: 3,
    category_name: "Marketing",
    category_desc: "Digital marketing, branding, SEO and analytics.",
  },
  {
    category_id: 4,
    category_name: "Business",
    category_desc: "Management, finance, entrepreneurship and strategy.",
  },
];
export const mockCourses: Course[] = [
  {
    course_id: 1,
    institution_id: 1,
    author_id: 3,
    category_id: 1,
    course_name: "JavaScript Zero to Hero",
    course_slug: "javascript-zero-to-hero",
    course_desc:
      "Full JavaScript course covering fundamentals, ES6+, async programming, DOM and real projects.",
    course_image: courseImg1,
    price: 49,
    is_published: true,
    visibility: "public",
    created_at: "2024-05-10",
    updated_at: "2025-01-20",
  },
  {
    course_id: 2,
    institution_id: 1,
    author_id: 3,
    category_id: 2,
    course_name: "UI/UX Design Essentials",
    course_slug: "ui-ux-design-essentials",
    course_desc:
      "Learn modern UI/UX design workflows, Figma, layout systems and usability principles.",
    course_image: courseImg2,
    price: 79,
    is_published: true,
    visibility: "public",
    created_at: "2024-09-03",
    updated_at: "2025-02-01",
  },
  {
    course_id: 3,
    institution_id: 2,
    author_id: 5,
    category_id: 3,
    course_name: "Digital Marketing Mastery",
    course_slug: "digital-marketing-mastery",
    course_desc:
      "Master SEO, content marketing, advertising, target analysis and social media strategies.",
    course_image: courseImg3,
    price: 99,
    is_published: false,
    visibility: "private",
    created_at: "2024-12-14",
    updated_at: "2025-03-10",
  },
  {
    course_id: 4,
    institution_id: 2,
    author_id: 6,
    category_id: 4,
    course_name: "Business Strategy Fundamentals",
    course_slug: "business-strategy-fundamentals",
    course_desc:
      "Learn high-level business decision-making, planning, team leading and risk analysis.",
    course_image: courseImg4,
    price: 129,
    is_published: true,
    visibility: "public",
    created_at: "2024-07-22",
    updated_at: "2025-02-17",
  },
  {
    course_id: 5,
    institution_id: 2,
    author_id: 6,
    category_id: 4,
    course_name: "Business Strategy Fundamentals",
    course_slug: "business-strategy-fundamentals",
    course_desc:
      "Learn high-level business decision-making, planning, team leading and risk analysis.",
    course_image: courseImg4,
    price: 129,
    is_published: true,
    visibility: "public",
    created_at: "2024-07-22",
    updated_at: "2025-02-17",
  },
  {
    course_id: 6,
    institution_id: 2,
    author_id: 6,
    category_id: 4,
    course_name: "Business Strategy Fundamentals",
    course_slug: "business-strategy-fundamentals",
    course_desc:
      "Learn high-level business decision-making, planning, team leading and risk analysis.",
    course_image: courseImg4,
    price: 129,
    is_published: true,
    visibility: "public",
    created_at: "2024-07-22",
    updated_at: "2025-02-17",
  },
  {
    course_id: 7,
    institution_id: 2,
    author_id: 6,
    category_id: 4,
    course_name: "Business Strategy Fundamentals",
    course_slug: "business-strategy-fundamentals",
    course_desc:
      "Learn high-level business decision-making, planning, team leading and risk analysis.",
    course_image: courseImg4,
    price: 129,
    is_published: true,
    visibility: "public",
    created_at: "2024-07-22",
    updated_at: "2025-02-17",
  },
  {
    course_id: 8,
    institution_id: 2,
    author_id: 6,
    category_id: 4,
    course_name: "Business Strategy Fundamentals",
    course_slug: "business-strategy-fundamentals",
    course_desc:
      "Learn high-level business decision-making, planning, team leading and risk analysis.",
    course_image: courseImg4,
    price: 129,
    is_published: true,
    visibility: "public",
    created_at: "2024-07-22",
    updated_at: "2025-02-17",
  },
  {
    course_id: 9,
    institution_id: 1,
    author_id: 3,
    category_id: 1,
    course_name: "JavaScript Zero to Hero",
    course_slug: "javascript-zero-to-hero",
    course_desc:
      "Full JavaScript course covering fundamentals, ES6+, async programming, DOM and real projects.",
    course_image: courseImg1,
    price: 0,
    is_published: true,
    visibility: "public",
    created_at: "2024-05-10",
    updated_at: "2025-01-20",
  },
  {
    course_id: 10,
    institution_id: 2,
    author_id: 5,
    category_id: 3,
    course_name: "Digital Marketing Mastery",
    course_slug: "digital-marketing-mastery",
    course_desc:
      "Master SEO, content marketing, advertising, target analysis and social media strategies.",
    course_image: courseImg3,
    price: 245,
    is_published: false,
    visibility: "private",
    created_at: "2024-12-14",
    updated_at: "2025-03-10",
  },
];
export const mockTariffs: Tariffs[] = [
  {
    tariff_id: 1,
    tariff_name: "Basic",
    tariff_desc: "Access to a limited number of courses and materials.",
    tariff_price: 499,
    created_at: "2025-11-01T10:00:00Z",
    updated_at: "2025-11-01T10:00:00Z",
  },
  {
    tariff_id: 2,
    tariff_name: "Standard",
    tariff_desc: "Full access to all courses and mentor support.",
    tariff_price: 999,
    created_at: "2025-11-02T12:30:00Z",
    updated_at: "2025-11-02T12:30:00Z",
  },
  {
    tariff_id: 3,
    tariff_name: "Premium",
    tariff_desc:
      "All courses, individual consultations and exclusive materials.",
    tariff_price: 1999,
    created_at: "2025-11-03T09:45:00Z",
    updated_at: "2025-11-03T09:45:00Z",
  },
  {
    tariff_id: 4,
    tariff_name: "Trial period",
    tariff_desc: "Limited access for 7 days for testing the platform.",
    tariff_price: 0,
    created_at: "2025-11-04T08:00:00Z",
    updated_at: "2025-11-04T08:00:00Z",
  },
];

// Posts
export const mockPosts: Post[] = [
  {
    post_id: 1,
    image: postImg,
    title: "Started a new Data Science course on Unicorn!",
    body: "Hello everyone! Decided to keep up with the trends and dove into the world of data. The Unicorn platform has been great so far with excellent introductions and interactive tasks. Highly recommend!",
    type: ListNews.COURSES,
    author: {
      author_id: 101,
      name: "Alexey Smirnov",
      avatar_url: avatarPlaceholder1,
      role: "Unicorn Student",
    },
    is_liked_by_user: true,
    likes_count: 42,
    comments_count: 8,
    views_count: 1200,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    tags: ["Data Science", "Learning", "Unicorn", "IT"],
    target_url: "unicorn.platform",
  },
  {
    post_id: 2,
    image: postImg,
    title: "Major Platform Update: New Code Editor!",
    body: "We are excited to introduce our new, improved code editor with syntax highlighting and autocompletion. Learning programming has never been easier! Read more details in our article.",
    type: ListNews.UPDATED,
    author: {
      author_id: 1,
      name: "Team Unicorn",
      avatar_url: avatarPlaceholder2,
      role: "Admin",
    },
    is_liked_by_user: false,
    likes_count: 150,
    comments_count: 24,
    views_count: 5600,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    tags: ["Update", "Programming", "Unicorn", "Tech"],
    target_url: "unicorn.platform",
  },
  {
    post_id: 3,
    image: postImg,
    title: "Success Story: How Mike landed a job after the design course",
    body: "Mike shares his experience transitioning from accounting to UX/UI design. His secret: perseverance and practical tasks on our platform.",
    type: ListNews.SUCCESS_STORY,
    author: {
      author_id: 102,
      name: "Michael Petrov",
      avatar_url: avatarPlaceholder1,
      role: "Alumni",
    },
    is_liked_by_user: false,
    likes_count: 89,
    comments_count: 15,
    views_count: 3200,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    tags: ["Review", "Design", "Success Story", "Career"],
  },
];
